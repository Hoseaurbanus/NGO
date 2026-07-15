<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'message' => 'SmugFlex API is working!',
    'php_version' => PHP_VERSION,
    'server' => $_SERVER['SERVER_NAME'] ?? 'unknown',
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
]);
