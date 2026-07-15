<?php
namespace Controllers;

use Libraries\ApiResponse;

class MessageController extends BaseApiController
{
    public function index(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $result = $this->paginate("SELECT * FROM messages WHERE deleted_at IS NULL ORDER BY created_at DESC");
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function store(): void
    {
        $input = $this->getInput();
        $errors = $this->validate($input, ['name' => 'required', 'email' => 'required|email', 'message' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $stmt = $this->db->prepare("INSERT INTO messages (name, email, phone, subject, message, is_read, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['name']), $this->sanitize($input['email']), $input['phone'] ?? null, $input['subject'] ?? null, $this->sanitize($input['message'])]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Message sent', 201);
    }

    public function markRead(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE messages SET is_read = 1, updated_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Message marked as read');
    }
}
