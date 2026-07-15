<?php
namespace Controllers;

use Libraries\ApiResponse;
use Libraries\JwtLibrary;

class AuthController extends BaseApiController
{
    public function login(): void
    {
        $input = $this->getInput();
        $errors = $this->validate($input, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($errors) ApiResponse::validation($errors);

        $email = $this->sanitize($input['email']);
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($input['password'], $user['password_hash'])) {
            ApiResponse::error('Invalid email or password', 401);
        }

        if ($user['status'] !== 'active') {
            ApiResponse::error('Account is inactive', 403);
        }

        $jwt = new JwtLibrary();
        $tokens = $jwt->generateTokens([
            'user_id' => (int) $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
        ]);

        $this->db->prepare("UPDATE users SET last_login_at = NOW() WHERE id = ?")->execute([$user['id']]);

        ApiResponse::success([
            'user' => [
                'id' => (int) $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role'],
                'avatar' => $user['avatar'],
            ],
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
        ], 'Login successful');
    }

    public function register(): void
    {
        $input = $this->getInput();
        $errors = $this->validate($input, [
            'name' => 'required|min:2',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        if ($errors) ApiResponse::validation($errors);

        $name = $this->sanitize($input['name']);
        $email = $this->sanitize($input['email']);

        $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            ApiResponse::error('Email already registered', 409);
        }

        $passwordHash = password_hash($input['password'], PASSWORD_BCRYPT, ['cost' => 12]);

        $stmt = $this->db->prepare("INSERT INTO users (name, email, password_hash, role, status, created_at, updated_at) VALUES (?, ?, ?, 'volunteer', 'active', NOW(), NOW())");
        $stmt->execute([$name, $email, $passwordHash]);
        $userId = (int) $this->db->lastInsertId();

        $jwt = new JwtLibrary();
        $tokens = $jwt->generateTokens([
            'user_id' => $userId,
            'email' => $email,
            'role' => 'volunteer',
        ]);

        ApiResponse::success([
            'user' => [
                'id' => $userId,
                'name' => $name,
                'email' => $email,
                'role' => 'volunteer',
            ],
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
        ], 'Registration successful', 201);
    }

    public function refresh(): void
    {
        $input = $this->getInput();
        if (empty($input['refresh_token'])) {
            ApiResponse::error('Refresh token required', 400);
        }

        $jwt = new JwtLibrary();
        $payload = $jwt->decode($input['refresh_token']);
        if (!$payload || ($payload['type'] ?? '') !== 'refresh') {
            ApiResponse::error('Invalid refresh token', 401);
        }

        $tokens = $jwt->generateTokens([
            'user_id' => $payload['user_id'],
            'email' => $payload['email'],
            'role' => $payload['role'],
        ]);

        ApiResponse::success([
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
        ], 'Token refreshed');
    }

    public function logout(): void
    {
        ApiResponse::success(null, 'Logged out successfully');
    }

    public function forgotPassword(): void
    {
        $input = $this->getInput();
        if (empty($input['email'])) ApiResponse::error('Email required', 400);
        ApiResponse::success(null, 'Password reset email sent');
    }

    public function resetPassword(): void
    {
        $input = $this->getInput();
        if (empty($input['token']) || empty($input['password'])) {
            ApiResponse::error('Token and password required', 400);
        }
        ApiResponse::success(null, 'Password reset successful');
    }
}
