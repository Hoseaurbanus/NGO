<?php
namespace Controllers;

use Libraries\ApiResponse;

class NewsController extends BaseApiController
{
    public function index(): void
    {
        $params = $this->getQueryParams();
        $query = "SELECT n.*, u.name as author_name FROM news n LEFT JOIN users u ON n.author_id = u.id WHERE n.deleted_at IS NULL";
        $binds = [];
        if (!empty($params['category'])) { $query .= " AND n.category = ?"; $binds[] = $params['category']; }
        $query .= " ORDER BY n.published_at DESC";
        $result = $this->paginate($query, $binds);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("SELECT n.*, u.name as author_name FROM news n LEFT JOIN users u ON n.author_id = u.id WHERE n.id = ? AND n.deleted_at IS NULL");
        $stmt->execute([$id]);
        $article = $stmt->fetch();
        if (!$article) ApiResponse::notFound('Article not found');
        ApiResponse::success($article);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'editor', 'content_manager'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required', 'content' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
        $stmt = $this->db->prepare("INSERT INTO news (title, slug, content, excerpt, image, category, author_id, status, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['title']), $slug, $input['content'], $input['excerpt'] ?? null, $input['image'] ?? null, $input['category'] ?? 'general', $this->userId, $input['status'] ?? 'draft', $input['published_at'] ?? date('Y-m-d H:i:s')]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Article created', 201);
    }

    public function update(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'editor', 'content_manager'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $input = $this->getInput();
        $fields = [];
        $values = [];
        foreach (['title', 'content', 'excerpt', 'image', 'category', 'status'] as $f) {
            if (isset($input[$f])) { $fields[] = "$f = ?"; $values[] = $input[$f]; }
        }
        if (empty($fields)) ApiResponse::error('No fields to update', 400);
        $values[] = $id;
        $this->db->prepare("UPDATE news SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?")->execute($values);
        ApiResponse::success(null, 'Article updated');
    }

    public function destroy(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'editor'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE news SET deleted_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Article deleted');
    }
}
