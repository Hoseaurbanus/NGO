<?php
namespace Controllers;

use Libraries\ApiResponse;

class VolunteerController extends BaseApiController
{
    public function index(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'volunteer_manager'])) return;
        $query = "SELECT v.*, u.name as user_name, u.email as user_email FROM volunteers v LEFT JOIN users u ON v.user_id = u.id WHERE v.deleted_at IS NULL ORDER BY v.created_at DESC";
        $result = $this->paginate($query);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function store(): void
    {
        $input = $this->getInput();
        $errors = $this->validate($input, ['name' => 'required', 'email' => 'required|email', 'skills' => 'required']);
        if ($errors) ApiResponse::validation($errors);

        $stmt = $this->db->prepare("INSERT INTO volunteers (user_id, name, email, phone, skills, availability, experience, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())");
        $stmt->execute([
            $input['user_id'] ?? null,
            $this->sanitize($input['name']),
            $this->sanitize($input['email']),
            $input['phone'] ?? null,
            $input['skills'],
            $input['availability'] ?? null,
            $input['experience'] ?? null,
        ]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Application submitted', 201);
    }

    public function approve(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'volunteer_manager'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE volunteers SET status = 'approved', updated_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Volunteer approved');
    }

    public function reject(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'volunteer_manager'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE volunteers SET status = 'rejected', updated_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Volunteer rejected');
    }
}
