<?php
namespace Controllers;

use Libraries\ApiResponse;

class EventController extends BaseApiController
{
    public function index(): void
    {
        $params = $this->getQueryParams();
        $query = "SELECT * FROM events WHERE deleted_at IS NULL";
        $binds = [];
        if (!empty($params['status'])) { $query .= " AND status = ?"; $binds[] = $params['status']; }
        $query .= " ORDER BY start_date ASC";
        $result = $this->paginate($query, $binds);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function show(): void
    {
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $stmt = $this->db->prepare("SELECT * FROM events WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $event = $stmt->fetch();
        if (!$event) ApiResponse::notFound('Event not found');
        ApiResponse::success($event);
    }

    public function store(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'event_manager'])) return;
        $input = $this->getInput();
        $errors = $this->validate($input, ['title' => 'required', 'start_date' => 'required']);
        if ($errors) ApiResponse::validation($errors);
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
        $stmt = $this->db->prepare("INSERT INTO events (title, slug, description, image, location, start_date, end_date, capacity, registration_required, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$this->sanitize($input['title']), $slug, $input['description'] ?? null, $input['image'] ?? null, $input['location'] ?? null, $input['start_date'], $input['end_date'] ?? null, $input['capacity'] ?? null, $input['registration_required'] ?? 1, $input['status'] ?? 'upcoming']);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Event created', 201);
    }

    public function update(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'event_manager'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $input = $this->getInput();
        $fields = [];
        $values = [];
        foreach (['title', 'description', 'image', 'location', 'start_date', 'end_date', 'capacity', 'status'] as $f) {
            if (isset($input[$f])) { $fields[] = "$f = ?"; $values[] = $input[$f]; }
        }
        if (empty($fields)) ApiResponse::error('No fields to update', 400);
        $values[] = $id;
        $this->db->prepare("UPDATE events SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?")->execute($values);
        ApiResponse::success(null, 'Event updated');
    }

    public function destroy(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $id = (int) ($this->getQueryParams()['id'] ?? 0);
        $this->db->prepare("UPDATE events SET deleted_at = NOW() WHERE id = ?")->execute([$id]);
        ApiResponse::success(null, 'Event deleted');
    }
}
