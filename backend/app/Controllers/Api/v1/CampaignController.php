<?php
namespace Controllers;

use Libraries\ApiResponse;

class CampaignController extends BaseApiController
{
    public function index(): void
    {
        $result = $this->paginate("SELECT * FROM campaigns WHERE deleted_at IS NULL ORDER BY created_at DESC");
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("SELECT * FROM campaigns WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $campaign = $stmt->fetch();
        if (!$campaign) ApiResponse::notFound('Campaign not found');
        ApiResponse::success($campaign);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required', 'goal_amount' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
        $stmt = $this->db->prepare("INSERT INTO campaigns (title, slug, description, image, goal_amount, raised_amount, start_date, end_date, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['title']), $slug, $input['description'] ?? null, $input['image'] ?? null, $input['goal_amount'], $input['start_date'] ?? null, $input['end_date'] ?? null, $input['status'] ?? 'active']);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Campaign created', 201);
    }
}
