<?php
namespace Config;

class Jwt
{
    public $secret = 'smugflex_jwt_secret_key_2026';
    public $algorithm = 'HS256';
    public $accessExpiration = 3600;
    public $refreshExpiration = 604800;
    public $issuer = 'smugflex';
}
