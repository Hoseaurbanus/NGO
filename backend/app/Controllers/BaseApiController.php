<?php
namespace Controllers;

use Libraries\JwtLibrary;
use Libraries\ApiResponse;

class BaseApiController
{
    protected $db;
    protected $jwt;
    protected $userId;
    protected $userRole;

    public function __construct()
    {
        $this->db = \Config\Database::connect();
        $this->jwt = new JwtLibrary();
        $this->handleCors();
    }

    private function handleCors(): void
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }

    protected function authenticate(): bool
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
            ApiResponse::unauthorized('No token provided');
            return false;
        }
        $token = $matches[1];
        $payload = $this->jwt->decode($token);
        if (!$payload || ($payload['type'] ?? '') !== 'access') {
            ApiResponse::unauthorized('Invalid or expired token');
            return false;
        }
        $this->userId = $payload['user_id'];
        $this->userRole = $payload['role'];
        return true;
    }

    protected function authorize(array $allowedRoles): bool
    {
        if (!$this->authenticate()) return false;
        if (!in_array($this->userRole, $allowedRoles)) {
            ApiResponse::forbidden('Insufficient permissions');
            return false;
        }
        return true;
    }

    protected function getInput(): array
    {
        $input = json_decode(file_get_contents('php://input'), true);
        return is_array($input) ? $input : [];
    }

    protected function getQueryParams(): array
    {
        return $_GET;
    }

    protected function paginate($query, array $params = [], int $perPage = 15): array
    {
        $page = max(1, (int) ($this->getQueryParams()['page'] ?? 1));
        $perPage = max(1, min(100, (int) ($this->getQueryParams()['per_page'] ?? $perPage)));
        $offset = ($page - 1) * $perPage;

        $countQuery = preg_replace('/SELECT .+? FROM/i', 'SELECT COUNT(*) as total FROM', $query, 1);
        $countQuery = preg_replace('/ORDER BY .+$/i', '', $countQuery);
        $stmt = $this->db->prepare($countQuery);
        $stmt->execute($params);
        $total = (int) $stmt->fetch()['total'];

        $query .= " LIMIT $perPage OFFSET $offset";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        $data = $stmt->fetchAll();

        return ['data' => $data, 'total' => $total, 'page' => $page, 'per_page' => $perPage];
    }

    protected function validate(array $data, array $rules): array
    {
        $errors = [];
        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;
            $ruleList = is_string($rule) ? explode('|', $rule) : $rule;
            foreach ($ruleList as $r) {
                if ($r === 'required' && empty($value) && $value !== '0' && $value !== 0) {
                    $errors[$field][] = "$field is required";
                } elseif (preg_match('/^min:(\d+)$/', $r, $m) && strlen($value) < $m[1]) {
                    $errors[$field][] = "$field must be at least {$m[1]} characters";
                } elseif (preg_match('/^max:(\d+)$/', $r, $m) && strlen($value) > $m[1]) {
                    $errors[$field][] = "$field must not exceed {$m[1]} characters";
                } elseif ($r === 'email' && $value && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $errors[$field][] = "$field must be a valid email";
                }
            }
        }
        return $errors;
    }

    protected function sanitize(string $input): string
    {
        return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
    }
}
