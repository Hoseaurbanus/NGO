<?php
// SmugFlex API - cPanel Deployment Entry Point
// Upload this file to public_html/index.php

define('ENVIRONMENT', 'production');
define('SYSTEM_PATH', __DIR__ . '/system');
define('APP_PATH', __DIR__ . '/app');
define('WRITEPATH', __DIR__ . '/writable');

// Load .env if phpdotenv is available
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (trim($line) === '' || strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (!array_key_exists($key, $_ENV)) {
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Bootstrap
if (is_file(SYSTEM_PATH . '/Common.php')) {
    require_once SYSTEM_PATH . '/Common.php';
}

require_once APP_PATH . '/Config/Constants.php';

$pathsFile = APP_PATH . '/Config/Paths.php';
$paths = file_exists($pathsFile) ? new $pathsFile() : new \Config\Paths();
BASEPATH::initialize($paths);

$appFile = APP_PATH . '/Config/App.php';
$app = file_exists($appFile) ? new $appFile() : new \stdClass();
if (method_exists($app, 'initialize')) {
    $app->initialize();
}
if (isset($app->baseURL)) {
    $app->baseURL = rtrim($app->baseURL, '/') . '/';
}

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Simple router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = '/' . trim($uri, '/');

// Serve static files
if ($uri !== '/' && is_file(__DIR__ . $uri)) {
    return false;
}

// API routing
require_once APP_PATH . '/Config/Routes.php';

$method = $_SERVER['REQUEST_METHOD'];
$route = \Config\Routes::match($method, $uri);

if ($route && isset($route['handler'])) {
    list($controllerName, $action) = $route['handler'];
    $controllerFile = APP_PATH . '/Controllers/Api/v1/' . $controllerName . '.php';

    if (!file_exists($controllerFile)) {
        $controllerFile = APP_PATH . '/Controllers/' . $controllerName . '.php';
    }

    if (file_exists($controllerFile)) {
        require_once $controllerFile;
        $controller = new $controllerName();

        $params = $route['params'] ?? [];
        call_user_func_array([$controller, $action], $params);
        exit;
    }
}

// 404
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'uri' => $uri, 'method' => $method]);
