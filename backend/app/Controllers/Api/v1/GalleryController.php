<?php
namespace Controllers;

use Libraries\ApiResponse;

class GalleryController extends BaseApiController
{
    public function index(): void
    {
        $params = $this->getQueryParams();
        $query = "SELECT * FROM gallery WHERE deleted_at IS NULL";
        $binds = [];
        if (!empty($params['category'])) { $query .= " AND category = ?"; $binds[] = $params['category']; }
        if (!empty($params['type'])) { $query .= " AND type = ?"; $binds[] = $params['type']; }
        $query .= " ORDER BY sort_order ASC, created_at DESC";
        $result = $this->paginate($query, $binds);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'editor', 'content_manager'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required', 'image' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $stmt = $this->db->prepare("INSERT INTO gallery (title, image, video_url, category, type, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['title']), $input['image'], $input['video_url'] ?? null, $input['category'] ?? null, $input['type'] ?? 'photo', $input['sort_order'] ?? 0]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Gallery item added', 201);
    }

    public function destroy(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'editor'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE gallery SET deleted_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Gallery item deleted');
    }
}
