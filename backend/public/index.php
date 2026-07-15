<?php
defined('BASEPATH') || exit('No direct script access allowed');

define('ENVIRONMENT', 'development');
define('SYSTEM_PATH', dirname(__DIR__) . '/system');
define('APP_PATH', dirname(__DIR__) . '/app');

if (is_file(SYSTEM_PATH . 'Common.php')) {
    require_once SYSTEM_PATH . 'Common.php';
}

require_once APP_PATH . 'Config/Constants.php';

$pathsConfig = APP_PATH . 'Config/Paths.php';
$pathsConfig = file_exists($pathsConfig) ? $pathsConfig : SYSTEM_PATH . 'Config/Paths.php';
$paths = new $pathsConfig();
BASEPATH::initialize($paths);

$applicationConfig = APP_PATH . 'Config/App.php';
$applicationConfig = file_exists($applicationConfig) ? $applicationConfig : SYSTEM_PATH . 'Config/App.php';
$app = new $applicationConfig();
$app->initialize();
$app->baseURL = rtrim($app->baseURL, '/') . '/';

$context = isCLI() ? 'php-cli' : 'web';
$logger = \Config\Services::logger(true);
$logger->setLogger($app);

$request = \Config\Services::request($app);
$response = \Config\Services::response($app);

$uri = $request->getUri()->getPath();
$uri = '/' . trim($uri, '/');

if ($uri !== '/' && is_file(APP_PATH . 'Controllers/' . $uri . '.php')) {
    $class = $uri;
    $method = 'index';
} elseif (preg_match('/^\/api\/v\d+\/(.+)/', $uri, $matches)) {
    $segments = explode('/', trim($matches[1], '/'));
    $class = ucfirst($segments[0]) . 'Controller';
    $method = $segments[1] ?? 'index';
} else {
    $segments = explode('/', trim($uri, '/'));
    $class = ucfirst($segments[0] ?? 'Home') . 'Controller';
    $method = $segments[1] ?? 'index';
}

$classFile = APP_PATH . 'Controllers/' . $class . '.php';
if (file_exists($classFile)) {
    require_once $classFile;
    $controller = new $class();
    $controller->$method();
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
