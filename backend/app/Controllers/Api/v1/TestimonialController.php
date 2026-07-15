<?php
namespace Controllers;

use Libraries\ApiResponse;

class TestimonialController extends BaseApiController
{
    public function index(): void
    {
        $result = $this->paginate("SELECT * FROM testimonials WHERE deleted_at IS NULL AND status = 'active' ORDER BY created_at DESC");
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'editor'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['name' => 'required', 'content' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $stmt = $this->db->prepare("INSERT INTO testimonials (name, role, content, image, rating, is_featured, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['name']), $input['role'] ?? null, $input['content'], $input['image'] ?? null, $input['rating'] ?? 5, $input['is_featured'] ?? 0, $input['status'] ?? 'active']);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Testimonial added', 201);
    }
}
