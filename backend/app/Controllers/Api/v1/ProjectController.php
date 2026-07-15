<?php
namespace Controllers;

use Libraries\ApiResponse;

class ProjectController extends BaseApiController
{
    public function index(): void
    {
        $params = $this->getQueryParams();
        $query = "SELECT p.*, pr.title as program_title FROM projects p LEFT JOIN programs pr ON p.program_id = pr.id WHERE p.deleted_at IS NULL";
        $binds = [];
        if (!empty($params['status'])) { $query .= " AND p.status = ?"; $binds[] = $params['status']; }
        if (!empty($params['program_id'])) { $query .= " AND p.program_id = ?"; $binds[] = $params['program_id']; }
        $query .= " ORDER BY p.created_at DESC";
        $result = $this->paginate($query, $binds);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("SELECT p.*, pr.title as program_title FROM projects p LEFT JOIN programs pr ON p.program_id = pr.id WHERE p.id = ? AND p.deleted_at IS NULL");
        $stmt->execute([$id]);
        $project = $stmt->fetch();
        if (!$project) ApiResponse::notFound('Project not found');
        ApiResponse::success($project);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'program_manager'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required', 'description' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
        $stmt = $this->db->prepare("INSERT INTO projects (title, slug, description, image, budget, funding_partner, status, location, start_date, end_date, program_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['title']), $slug, $input['description'], $input['image'] ?? null, $input['budget'] ?? null, $input['funding_partner'] ?? null, $input['status'] ?? 'ongoing', $input['location'] ?? null, $input['start_date'] ?? null, $input['end_date'] ?? null, $input['program_id'] ?? null]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Project created', 201);
    }

    public function update(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'program_manager'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $input = $this->getInput();
        $fields = [];
        $values = [];
        foreach (['title', 'description', 'image', 'budget', 'funding_partner', 'status', 'location', 'start_date', 'end_date'] as $f) {
            if (isset($input[$f])) { $fields[] = "$f = ?"; $values[] = $input[$f]; }
        }
        if (empty($fields)) ApiResponse::error('No fields to update', 400);
        $values[] = $id;
        $this->db->prepare("UPDATE projects SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?")->execute($values);
        ApiResponse::success(null, 'Project updated');
    }

    public function destroy(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE projects SET deleted_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Project deleted');
    }
}
