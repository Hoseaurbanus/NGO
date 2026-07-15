<?php
namespace Config;

class Database
{
    public $default = [
        'hostname' => 'localhost',
        'username' => 'root',
        'password' => '',
        'database' => 'smugflex',
        'dbdriver' => 'pdo',
        'dbprefix' => '',
        'pconnect' => false,
        'db_debug' => true,
        'cache_on' => false,
        'charset' => 'utf8mb4',
        'collat' => 'utf8mb4_unicode_ci',
    ];

    public static function connect(): \PDO
    {
        $config = new self();
        $db = $config->default;
        $dsn = "mysql:host={$db['hostname']};dbname={$db['database']};charset={$db['charset']}";
        $options = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new \PDO($dsn, $db['username'], $db['password'], $options);
    }
}
