<?php
namespace Controllers;

use Libraries\ApiResponse;

class PartnerController extends BaseApiController
{
    public function index(): void
    {
        $result = $this->paginate("SELECT * FROM partners WHERE deleted_at IS NULL ORDER BY sort_order ASC");
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['name' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $stmt = $this->db->prepare("INSERT INTO partners (name, logo, url, description, type, status, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['name']), $input['logo'] ?? null, $input['url'] ?? null, $input['description'] ?? null, $input['type'] ?? 'partner', $input['status'] ?? 'active', $input['sort_order'] ?? 0]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Partner added', 201);
    }
}
