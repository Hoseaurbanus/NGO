<?php
namespace Controllers;

use Libraries\ApiResponse;

class SettingController extends BaseApiController
{
    public function index(): void
    {
        $group = $this->getQueryParams()['group'] ?? null;
        $query = "SELECT * FROM settings";
        $binds = [];
        if ($group) { $query .= " WHERE `group` = ?"; $binds[] = $group; }
        $stmt = $this->db->prepare($query);
        $stmt->execute($binds);
        $settings = [];
        foreach ($stmt->fetchAll() as $s) {
            $settings[$s['key']] = $s['value'];
        }
        ApiResponse::success($settings);
    }

    public function update(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $input = $this->getInput();
        foreach ($input as $key => $value) {
            $stmt = $this->db->prepare("INSERT INTO settings (`key`, value, `group`, updated_at) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = NOW()");
            $stmt->execute([$key, $value, 'general']);
        }
        ApiResponse::success(null, 'Settings updated');
    }
}
