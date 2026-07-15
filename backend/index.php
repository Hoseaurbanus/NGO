<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') === false) continue;
        list($k, $v) = explode('=', $line, 2);
        $k = trim($k);
        $v = trim($v);
        if (!array_key_exists($k, $_ENV)) $_ENV[$k] = $v;
    }
}

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host={$_ENV['database.hostname']};dbname={$_ENV['database.database']};charset=utf8mb4";
        $pdo = new PDO($dsn, $_ENV['database.username'], $_ENV['database.password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}

function json($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function input(): array {
    $raw = file_get_contents('php://input');
    return $raw ? json_decode($raw, true) : [];
}

$method = $_SERVER['REQUEST_METHOD'];

// Extract route from multiple sources
$uri = '';

// 1. Query string: ?route=programs
if (!empty($_GET['route'])) {
    $uri = $_GET['route'];
}

// 2. PATH_INFO: /index.php/programs
if (empty($uri) && !empty($_SERVER['PATH_INFO'])) {
    $uri = $_SERVER['PATH_INFO'];
}

// 3. Request URI: /api/v1/programs or /programs
if (empty($uri)) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = preg_replace('#^/api/v\d+/?#', '', $uri);
    $uri = preg_replace('#^/?index\.php/?#', '', $uri);
}

$uri = '/' . trim($uri, '/');
if ($uri === '/') $uri = '/home';

// ============ AUTH ============
if ($uri === '/auth/login' && $method === 'POST') {
    $d = input();
    if (empty($d['email']) || empty($d['password'])) json(['success'=>false,'message'=>'Email and password required'], 400);
    try {
        $s = db()->prepare("SELECT id,name,email,password_hash,role,status,avatar FROM users WHERE email=? AND deleted_at IS NULL");
        $s->execute([$d['email']]);
        $u = $s->fetch();
        if (!$u || !password_verify($d['password'], $u['password_hash'])) json(['success'=>false,'message'=>'Invalid credentials'], 401);
        if ($u['status'] !== 'active') json(['success'=>false,'message'=>'Account is '.$u['status']], 403);
        unset($u['password_hash']);
        $token = base64_encode(json_encode(['user_id'=>$u['id'],'role'=>$u['role'],'exp'=>time()+3600]));
        json(['success'=>true,'message'=>'Login successful','data'=>['user'=>$u,'token'=>$token,'expires_in'=>3600]]);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Server error'], 500); }
}

if ($uri === '/auth/register' && $method === 'POST') {
    $d = input();
    if (empty($d['name'])||empty($d['email'])||empty($d['password'])) json(['success'=>false,'message'=>'All fields required'], 400);
    try {
        $hash = password_hash($d['password'], PASSWORD_BCRYPT);
        $now = date('Y-m-d H:i:s');
        $s = db()->prepare("INSERT INTO users (name,email,password_hash,role,status,created_at,updated_at) VALUES (?,?,?,?,'active',?,?)");
        $s->execute([$d['name'],$d['email'],$hash,$d['role']??'volunteer',$now,$now]);
        $id = db()->lastInsertId();
        $token = base64_encode(json_encode(['user_id'=>$id,'role'=>$d['role']??'volunteer','exp'=>time()+3600]));
        json(['success'=>true,'message'=>'Registered','data'=>['user'=>['id'=>$id,'name'=>$d['name'],'email'=>$d['email'],'role'=>$d['role']??'volunteer','status'=>'active'],'token'=>$token]], 201);
    } catch (PDOException $e) {
        if (str_contains($e->getMessage(),'Duplicate')) json(['success'=>false,'message'=>'Email already exists'], 409);
        json(['success'=>false,'message'=>'Server error'], 500);
    }
}

// ============ SPECIAL ROUTES ============
if ($uri === '/reports/dashboard' && $method === 'GET') {
    try {
        $pdo = db();
        $stats = [];
        foreach (['users','programs','projects','events','donations','volunteers','news'] as $t) {
            $stats[$t] = (int)$pdo->query("SELECT COUNT(*) FROM $t WHERE deleted_at IS NULL")->fetchColumn();
        }
        $stats['total_raised'] = (float)$pdo->query("SELECT COALESCE(SUM(amount),0) FROM donations WHERE status='completed' AND deleted_at IS NULL")->fetchColumn();
        json(['success'=>true,'data'=>$stats]);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if ($uri === '/donations/history' && $method === 'GET') {
    try {
        $s = db()->query("SELECT d.*, c.title as campaign_title FROM donations d LEFT JOIN campaigns c ON d.campaign_id = c.id WHERE d.deleted_at IS NULL ORDER BY d.created_at DESC LIMIT 50");
        json(['success'=>true,'data'=>$s->fetchAll()]);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if (preg_match('#^/volunteers/(\d+)/approve$#', $uri, $m) && $method === 'PUT') {
    try {
        $s = db()->prepare("UPDATE volunteers SET status='approved', updated_at=NOW() WHERE id=?");
        $s->execute([$m[1]]);
        json(['success'=>true,'message'=>'Volunteer approved']);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if (preg_match('#^/volunteers/(\d+)/reject$#', $uri, $m) && $method === 'PUT') {
    try {
        $s = db()->prepare("UPDATE volunteers SET status='rejected', updated_at=NOW() WHERE id=?");
        $s->execute([$m[1]]);
        json(['success'=>true,'message'=>'Volunteer rejected']);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if ($uri === '/newsletter/subscribe' && $method === 'POST') {
    $d = input();
    if (empty($d['email'])) json(['success'=>false,'message'=>'Email required'], 400);
    try {
        $s = db()->prepare("INSERT INTO newsletter_subscribers (email,status,subscribed_at) VALUES (?,'active',NOW()) ON DUPLICATE KEY UPDATE status='active'");
        $s->execute([$d['email']]);
        json(['success'=>true,'message'=>'Subscribed'], 201);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if ($uri === '/newsletter/unsubscribe' && $method === 'DELETE') {
    $d = input();
    if (empty($d['email'])) json(['success'=>false,'message'=>'Email required'], 400);
    try {
        $s = db()->prepare("UPDATE newsletter_subscribers SET status='inactive', unsubscribed_at=NOW() WHERE email=?");
        $s->execute([$d['email']]);
        json(['success'=>true,'message'=>'Unsubscribed']);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if (preg_match('#^/careers/(\d+)/apply$#', $uri, $m) && $method === 'POST') {
    $d = input();
    if (empty($d['name']) || empty($d['email'])) json(['success'=>false,'message'=>'Name and email required'], 400);
    try {
        $d['career_id'] = $m[1];
        $d['created_at'] = date('Y-m-d H:i:s');
        $d['updated_at'] = date('Y-m-d H:i:s');
        $cols = implode(',', array_map(fn($k)=>"`$k`", array_keys($d)));
        $ph = implode(',', array_fill(0,count($d),'?'));
        $s = db()->prepare("INSERT INTO applications ($cols) VALUES ($ph)");
        $s->execute(array_values($d));
        json(['success'=>true,'message'=>'Application submitted'], 201);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

if (preg_match('#^/messages/(\d+)/read$#', $uri, $m) && $method === 'PUT') {
    try {
        $s = db()->prepare("UPDATE messages SET is_read=1 WHERE id=?");
        $s->execute([$m[1]]);
        json(['success'=>true,'message'=>'Marked as read']);
    } catch (Exception $e) { json(['success'=>false,'message'=>'Error'], 500); }
}

// ============ GENERIC RESOURCES ============
$resources = [
    'programs'=>'programs', 'projects'=>'projects', 'events'=>'events', 'news'=>'news',
    'donations'=>'donations', 'campaigns'=>'campaigns', 'volunteers'=>'volunteers',
    'gallery'=>'gallery', 'testimonials'=>'testimonials', 'partners'=>'partners',
    'careers'=>'careers', 'messages'=>'messages', 'users'=>'users', 'settings'=>'settings',
    'applications'=>'applications', 'activity_logs'=>'activity_logs',
];

$parts = array_values(array_filter(explode('/', $uri)));
$resource = $parts[0] ?? '';
$id = $parts[1] ?? null;

if (isset($resources[$resource])) {
    $table = $resources[$resource];
    try {
        $pdo = db();

        if ($method === 'GET' && $id === null) {
            $page = max(1, (int)($_GET['page']??1));
            $limit = min(100, max(1, (int)($_GET['limit']??12)));
            $offset = ($page-1)*$limit;
            $total = (int)$pdo->query("SELECT COUNT(*) FROM $table WHERE deleted_at IS NULL")->fetchColumn();
            $items = $pdo->prepare("SELECT * FROM $table WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
            $items->execute();
            json(['success'=>true,'data'=>$items->fetchAll(),'pagination'=>['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>ceil($total/$limit)]]);
        }

        if ($method === 'GET' && $id !== null) {
            $s = $pdo->prepare("SELECT * FROM $table WHERE id=? AND deleted_at IS NULL");
            $s->execute([$id]);
            $item = $s->fetch();
            if (!$item) json(['success'=>false,'message'=>'Not found'], 404);
            json(['success'=>true,'data'=>$item]);
        }

        if ($method === 'POST' && $id === null) {
            $d = input();
            if (empty($d)) json(['success'=>false,'message'=>'No data'], 400);
            $d['created_at'] = date('Y-m-d H:i:s');
            $d['updated_at'] = date('Y-m-d H:i:s');
            $cols = implode(',', array_map(fn($k)=>"`$k`", array_keys($d)));
            $ph = implode(',', array_fill(0,count($d),'?'));
            $s = $pdo->prepare("INSERT INTO $table ($cols) VALUES ($ph)");
            $s->execute(array_values($d));
            json(['success'=>true,'message'=>'Created','data'=>['id'=>$pdo->lastInsertId()]], 201);
        }

        if ($method === 'PUT' && $id !== null) {
            $d = input();
            $d['updated_at'] = date('Y-m-d H:i:s');
            $sets = implode(',', array_map(fn($k)=>"`$k`=?", array_keys($d)));
            $s = $pdo->prepare("UPDATE $table SET $sets WHERE id=?");
            $p = array_values($d);
            $p[] = $id;
            $s->execute($p);
            json(['success'=>true,'message'=>'Updated']);
        }

        if ($method === 'DELETE' && $id !== null) {
            $s = $pdo->prepare("UPDATE $table SET deleted_at=NOW() WHERE id=?");
            $s->execute([$id]);
            json(['success'=>true,'message'=>'Deleted']);
        }

    } catch (Exception $e) { json(['success'=>false,'message'=>'Error: '.$e->getMessage()], 500); }
}

json(['status'=>'ok','api'=>'SmugFlex API v1','version'=>'1.0.0']);
