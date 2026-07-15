<?php
namespace Libraries;

use Config\Jwt as JwtConfig;

class JwtLibrary
{
    private string $secret;
    private string $algorithm;
    private int $accessExpiration;
    private int $refreshExpiration;

    public function __construct()
    {
        $config = new JwtConfig();
        $this->secret = getenv('JWT_SECRET') ?: $config->secret;
        $this->algorithm = $config->algorithm;
        $this->accessExpiration = $config->accessExpiration;
        $this->refreshExpiration = $config->refreshExpiration;
    }

    public function generateTokens(array $payload): array
    {
        $accessPayload = array_merge($payload, [
            'iat' => time(),
            'exp' => time() + $this->accessExpiration,
            'type' => 'access',
        ]);
        $refreshPayload = array_merge($payload, [
            'iat' => time(),
            'exp' => time() + $this->refreshExpiration,
            'type' => 'refresh',
        ]);
        return [
            'access_token' => $this->encode($accessPayload),
            'refresh_token' => $this->encode($refreshPayload),
        ];
    }

    public function encode(array $payload): string
    {
        $header = $this->base64UrlEncode(json_encode(['alg' => $this->algorithm, 'typ' => 'JWT']));
        $payload = $this->base64UrlEncode(json_encode($payload));
        $signature = $this->base64UrlEncode(
            hash_hmac('sha256', "$header.$payload", $this->secret, true)
        );
        return "$header.$payload.$signature";
    }

    public function decode(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;
        [$header, $payload, $signature] = $parts;
        $expectedSignature = $this->base64UrlEncode(
            hash_hmac('sha256', "$header.$payload", $this->secret, true)
        );
        if (!hash_equals($expectedSignature, $signature)) return null;
        $payload = json_decode($this->base64UrlDecode($payload), true);
        if (!$payload || ($payload['exp'] ?? 0) < time()) return null;
        return $payload;
    }

    public function validateToken(string $token): bool
    {
        return $this->decode($token) !== null;
    }

    public function getUserId(string $token): ?int
    {
        $payload = $this->decode($token);
        return $payload['user_id'] ?? null;
    }

    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', 3 - (3 + strlen($data)) % 4));
    }
}
