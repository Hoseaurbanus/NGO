<?php
namespace Controllers;

use Libraries\ApiResponse;

class ProgramController extends BaseApiController
{
    public function index(): void
    {
        $params = $this->getQueryParams();
        $query = "SELECT * FROM programs WHERE deleted_at IS NULL";
        $binds = [];

        if (!empty($params['search'])) {
            $query .= " AND (title LIKE ? OR description LIKE ?)";
            $search = "%{$params['search']}%";
            $binds[] = $search;
            $binds[] = $search;
        }
        if (!empty($params['status'])) {
            $query .= " AND status = ?";
            $binds[] = $params['status'];
        }

        $query .= " ORDER BY sort_order ASC, created_at DESC";
        $result = $this->paginate($query, $binds);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("SELECT * FROM programs WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $program = $stmt->fetch();
        if (!$program) ApiResponse::notFound('Program not found');
        ApiResponse::success($program);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'program_manager'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required|max:255', 'description' => 'required']);
        if ($errors) ApiResponse::validation($errors);

        $stmt = $this->db->prepare("INSERT INTO programs (title, slug, description, image, status, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
        $stmt->execute([
            $this->sanitize($input['title']),
            $slug,
            $input['description'],
            $input['image'] ?? null,
            $input['status'] ?? 'active',
            $input['sort_order'] ?? 0,
        ]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Program created', 201);
    }

    public function update(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'program_manager'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $input = $this->getInput();
        $fields = [];
        $values = [];
        foreach (['title', 'description', 'image', 'status', 'sort_order'] as $field) {
            if (isset($input[$field])) {
                $fields[] = "$field = ?";
                $values[] = $input[$field];
            }
        }
        if (empty($fields)) ApiResponse::error('No fields to update', 400);
        $values[] = $id;
        $this->db->prepare("UPDATE programs SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?")->execute($values);
        ApiResponse::success(null, 'Program updated');
    }

    public function destroy(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE programs SET deleted_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Program deleted');
    }
}
