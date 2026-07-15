<?php
namespace Controllers;

use Libraries\ApiResponse;

class UserController extends BaseApiController
{
    public function index(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $query = "SELECT id, name, email, role, status, avatar, phone, created_at FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC";
        $result = $this->paginate($query);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        if (!$this->authenticate()) return;
        $id = (int) ($this->getQueryParams()['id'] ?? $this->userId);
        $stmt = $this->db->prepare("SELECT id, name, email, role, status, avatar, phone, created_at FROM users WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if (!$user) ApiResponse::notFound('User not found');
        ApiResponse::success($user);
    }

    public function update(): void
    {
        if (!$this->authenticate()) return;
        $id = (int) ($this->getQueryParams()['id'] ?? $this->userId);
        if ($id !== $this->userId && !in_array($this->userRole, ['super_admin', 'admin'])) {
            ApiResponse::forbidden();
        }
        $input = $this->getInput();
        $fields = [];
        $values = [];
        foreach (['name', 'phone', 'avatar'] as $f) {
            if (isset($input[$f])) { $fields[] = "$f = ?"; $values[] = $input[$f]; }
        }
        if (empty($fields)) ApiResponse::error('No fields to update', 400);
        $values[] = $id;
        $this->db->prepare("UPDATE users SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?")->execute($values);
        ApiResponse::success(null, 'User updated');
    }
}
