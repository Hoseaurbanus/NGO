<?php
namespace Controllers;

use Libraries\ApiResponse;

class ReportController extends BaseApiController
{
    public function dashboard(): void
    {
        if (!$this->authorize(['super_admin', 'admin'])) return;
        $stats = [];
        $stats['total_donations'] = $this->db->query("SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE deleted_at IS NULL AND status = 'completed'")->fetch()['total'];
        $stats['monthly_donations'] = $this->db->query("SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE deleted_at IS NULL AND status = 'completed' AND created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')")->fetch()['total'];
        $stats['total_volunteers'] = $this->db->query("SELECT COUNT(*) as total FROM volunteers WHERE deleted_at IS NULL AND status = 'approved'")->fetch()['total'];
        $stats['total_programs'] = $this->db->query("SELECT COUNT(*) as total FROM programs WHERE deleted_at IS NULL")->fetch()['total'];
        $stats['total_projects'] = $this->db->query("SELECT COUNT(*) as total FROM projects WHERE deleted_at IS NULL")->fetch()['total'];
        $stats['total_events'] = $this->db->query("SELECT COUNT(*) as total FROM events WHERE deleted_at IS NULL AND start_date >= CURDATE()")->fetch()['total'];
        $stats['pending_volunteers'] = $this->db->query("SELECT COUNT(*) as total FROM volunteers WHERE deleted_at IS NULL AND status = 'pending'")->fetch()['total'];
        $stats['unread_messages'] = $this->db->query("SELECT COUNT(*) as total FROM messages WHERE deleted_at IS NULL AND is_read = 0")->fetch()['total'];
        ApiResponse::success($stats);
    }

    public function donations(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'finance_officer'])) return;
        $data = $this->db->query("SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count, SUM(amount) as total FROM donations WHERE deleted_at IS NULL AND status = 'completed' GROUP BY month ORDER BY month DESC LIMIT 12")->fetchAll();
        ApiResponse::success($data);
    }

    public function volunteers(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'volunteer_manager'])) return;
        $data = $this->db->query("SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count, SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved FROM volunteers WHERE deleted_at IS NULL GROUP BY month ORDER BY month DESC LIMIT 12")->fetchAll();
        ApiResponse::success($data);
    }
}
