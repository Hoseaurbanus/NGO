<?php
namespace Controllers;

use Libraries\ApiResponse;

class CareerController extends BaseApiController
{
    public function index(): void
    {
        $result = $this->paginate("SELECT * FROM careers WHERE deleted_at IS NULL AND status = 'active' ORDER BY created_at DESC");
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("SELECT * FROM careers WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $career = $stmt->fetch();
        if (!$career) ApiResponse::notFound('Career not found');
        ApiResponse::success($career);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required', 'description' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
        $stmt = $this->db->prepare("INSERT INTO careers (title, slug, description, department, type, location, salary_range, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['title']), $slug, $input['description'], $input['department'] ?? null, $input['type'] ?? 'full-time', $input['location'] ?? null, $input['salary_range'] ?? null, $input['status'] ?? 'active']);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Career posted', 201);
    }

    public function apply(): void
    {
        $input = $this->getInput();
        $errors = $this->validate($input, ['name' => 'required', 'email' => 'required|email']);
        if ($errors) ApiResponse::validation($errors);
        $careerId = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("INSERT INTO applications (career_id, user_id, name, email, cover_letter, cv_url, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())");
        $stmt->execute([$careerId, $input['user_id'] ?? null, $this->sanitize($input['name']), $this->sanitize($input['email']), $input['cover_letter'] ?? null, $input['cv_url'] ?? null]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Application submitted', 201);
    }
}
