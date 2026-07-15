<?php
/**
 * SmugFlex API - Standalone Entry Point
 * Works on any PHP 8.2+ hosting without framework dependencies
 */

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load .env
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') === false) continue;
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (!array_key_exists($key, $_ENV)) {
            $_ENV[$key] = $value;
        }
    }
}

// Database connection
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $host = $_ENV['database.hostname'] ?? 'localhost';
        $user = $_ENV['database.username'] ?? 'root';
        $pass = $_ENV['database.password'] ?? '';
        $name = $_ENV['database.database'] ?? 'smugflex';
        $dsn = "mysql:host=$host;dbname=$name;charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}

// JSON response
function jsonResponse($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Get request body as JSON
function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    return $raw ? json_decode($raw, true) : [];
}

// Simple router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];

// CORS preflight
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ============ ROUTES ============

// Health check
if ($uri === '/' || $uri === '/api') {
    jsonResponse(['status' => 'ok', 'message' => 'SmugFlex API v1', 'version' => '1.0.0']);
}

// Auth routes
if ($uri === '/api/v1/auth/login' && $method === 'POST') {
    $input = getJsonInput();
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Email and password required'], 400);
    }

    try {
        $db = getDB();
        $stmt = $db->prepare("SELECT id, name, email, password_hash, role, status, avatar FROM users WHERE email = ? AND deleted_at IS NULL");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            jsonResponse(['success' => false, 'message' => 'Invalid credentials'], 401);
        }

        if ($user['status'] !== 'active') {
            jsonResponse(['success' => false, 'message' => 'Account is ' . $user['status']], 403);
        }

        // Generate simple token
        $token = base64_encode(json_encode(['user_id' => $user['id'], 'exp' => time() + 3600]));
        unset($user['password_hash']);

        jsonResponse([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'expires_in' => 3600,
            ]
        ]);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Database error'], 500);
    }
}

// Auth register
if ($uri === '/api/v1/auth/register' && $method === 'POST') {
    $input = getJsonInput();
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Name, email and password required'], 400);
    }

    try {
        $db = getDB();
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $now = date('Y-m-d H:i:s');
        $stmt = $db->prepare("INSERT INTO users (name, email, password_hash, role, status, created_at, updated_at) VALUES (?, ?, ?, 'volunteer', 'active', ?, ?)");
        $stmt->execute([$name, $email, $hash, $now, $now]);
        $userId = $db->lastInsertId();

        $token = base64_encode(json_encode(['user_id' => $userId, 'exp' => time() + 3600]));

        jsonResponse([
            'success' => true,
            'message' => 'Registration successful',
            'data' => [
                'user' => ['id' => $userId, 'name' => $name, 'email' => $email, 'role' => 'volunteer', 'status' => 'active'],
                'token' => $token,
                'expires_in' => 3600,
            ]
        ], 201);
    } catch (PDOException $e) {
        if (str_contains($e->getMessage(), 'Duplicate')) {
            jsonResponse(['success' => false, 'message' => 'Email already exists'], 409);
        }
        jsonResponse(['success' => false, 'message' => 'Database error'], 500);
    }
}

// Generic resource handler
function handleResource(string $resource, string $uri, string $method): void {
    try {
        $db = getDB();

        // GET all
        if ($uri === "/api/v1/$resource" && $method === 'GET') {
            $page = max(1, (int)($_GET['page'] ?? 1));
            $limit = min(100, max(1, (int)($_GET['limit'] ?? 12)));
            $offset = ($page - 1) * $limit;

            $table = $resource;
            $stmt = $db->prepare("SELECT COUNT(*) as total FROM $table WHERE deleted_at IS NULL");
            $stmt->execute();
            $total = (int)$stmt->fetch()['total'];

            $stmt = $db->prepare("SELECT * FROM $table WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
            $stmt->execute();
            $items = $stmt->fetchAll();

            jsonResponse([
                'success' => true,
                'data' => $items,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit),
                ]
            ]);
        }

        // GET single
        if (preg_match('#^/api/v1/' . preg_quote($resource) . '/(\d+)$#', $uri, $m) && $method === 'GET') {
            $stmt = $db->prepare("SELECT * FROM $resource WHERE id = ? AND deleted_at IS NULL");
            $stmt->execute([$m[1]]);
            $item = $stmt->fetch();
            if (!$item) {
                jsonResponse(['success' => false, 'message' => 'Not found'], 404);
            }
            jsonResponse(['success' => true, 'data' => $item]);
        }

        // POST create
        if ($uri === "/api/v1/$resource" && $method === 'POST') {
            $input = getJsonInput();
            if (empty($input)) {
                jsonResponse(['success' => false, 'message' => 'No data provided'], 400);
            }
            $input['created_at'] = date('Y-m-d H:i:s');
            $input['updated_at'] = date('Y-m-d H:i:s');

            $cols = implode(', ', array_map(fn($k) => "`$k`", array_keys($input)));
            $placeholders = implode(', ', array_fill(0, count($input), '?'));
            $stmt = $db->prepare("INSERT INTO $resource ($cols) VALUES ($placeholders)");
            $stmt->execute(array_values($input));

            jsonResponse(['success' => true, 'message' => 'Created', 'data' => ['id' => $db->lastInsertId()]], 201);
        }

        // PUT update
        if (preg_match('#^/api/v1/' . preg_quote($resource) . '/(\d+)$#', $uri, $m) && $method === 'PUT') {
            $input = getJsonInput();
            $input['updated_at'] = date('Y-m-d H:i:s');
            $sets = implode(', ', array_map(fn($k) => "`$k` = ?", array_keys($input)));
            $stmt = $db->prepare("UPDATE $resource SET $sets WHERE id = ? AND deleted_at IS NULL");
            $params = array_values($input);
            $params[] = $m[1];
            $stmt->execute($params);
            jsonResponse(['success' => true, 'message' => 'Updated']);
        }

        // DELETE (soft)
        if (preg_match('#^/api/v1/' . preg_quote($resource) . '/(\d+)$#', $uri, $m) && $method === 'DELETE') {
            $stmt = $db->prepare("UPDATE $resource SET deleted_at = NOW() WHERE id = ?");
            $stmt->execute([$m[1]]);
            jsonResponse(['success' => true, 'message' => 'Deleted']);
        }

    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Server error: ' . $e->getMessage()], 500);
    }
}

// Route matching for resources
$resources = ['programs', 'projects', 'events', 'news', 'donations', 'campaigns', 'volunteers', 'gallery', 'testimonials', 'partners', 'careers', 'messages', 'newsletter_subscribers', 'users', 'settings', 'applications', 'activity_logs'];

foreach ($resources as $resource) {
    $pattern = '#^/api/v1/' . preg_quote($resource) . '(/(\d+))?$#';
    if (preg_match($pattern, $uri)) {
        handleResource($resource, $uri, $method);
        exit;
    }
}

// Special routes
// Donation history
if ($uri === '/api/v1/donations/history' && $method === 'GET') {
    try {
        $db = getDB();
        $stmt = $db->prepare("SELECT d.*, c.title as campaign_title FROM donations d LEFT JOIN campaigns c ON d.campaign_id = c.id WHERE d.deleted_at IS NULL ORDER BY d.created_at DESC LIMIT 50");
        $stmt->execute();
        jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Server error'], 500);
    }
}

// Newsletter subscribe
if ($uri === '/api/v1/newsletter/subscribe' && $method === 'POST') {
    $input = getJsonInput();
    $email = $input['email'] ?? '';
    if (empty($email)) {
        jsonResponse(['success' => false, 'message' => 'Email required'], 400);
    }
    try {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO newsletter_subscribers (email, status, subscribed_at) VALUES (?, 'active', NOW()) ON DUPLICATE KEY UPDATE status = 'active'");
        $stmt->execute([$email]);
        jsonResponse(['success' => true, 'message' => 'Subscribed successfully'], 201);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Server error'], 500);
    }
}

// Reports
if ($uri === '/api/v1/reports/dashboard' && $method === 'GET') {
    try {
        $db = getDB();
        $stats = [];
        foreach (['users', 'programs', 'projects', 'events', 'donations', 'volunteers', 'news'] as $t) {
            $stmt = $db->query("SELECT COUNT(*) as c FROM $t WHERE deleted_at IS NULL");
            $stats[$t] = (int)$stmt->fetch()['c'];
        }
        $stmt = $db->query("SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE status = 'completed' AND deleted_at IS NULL");
        $stats['total_raised'] = (float)$stmt->fetch()['total'];
        jsonResponse(['success' => true, 'data' => $stats]);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Server error'], 500);
    }
}

// Volunteer approve/reject
if (preg_match('#^/api/v1/volunteers/(\d+)/approve$#', $uri, $m) && $method === 'PUT') {
    try {
        $db = getDB();
        $stmt = $db->prepare("UPDATE volunteers SET status = 'approved', updated_at = NOW() WHERE id = ?");
        $stmt->execute([$m[1]]);
        jsonResponse(['success' => true, 'message' => 'Volunteer approved']);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Server error'], 500);
    }
}

if (preg_match('#^/api/v1/volunteers/(\d+)/reject$#', $uri, $m) && $method === 'PUT') {
    try {
        $db = getDB();
        $stmt = $db->prepare("UPDATE volunteers SET status = 'rejected', updated_at = NOW() WHERE id = ?");
        $stmt->execute([$m[1]]);
        jsonResponse(['success' => true, 'message' => 'Volunteer rejected']);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'message' => 'Server error'], 500);
    }
}

// 404
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'uri' => $uri, 'method' => $method]);
