<?php
namespace Controllers;

use Libraries\ApiResponse;

class DonationController extends BaseApiController
{
    public function index(): void
    {
        if (!$this->authorize(['super_admin', 'admin', 'finance_officer'])) return;
        $query = "SELECT d.*, u.name as donor_name, c.title as campaign_title FROM donations d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN campaigns c ON d.campaign_id = c.id WHERE d.deleted_at IS NULL ORDER BY d.created_at DESC";
        $result = $this->paginate($query);
        ApiResponse::paginated($result['data'], $result['total'], $result['page'], $result['per_page']);
    }

    public function store(): void
    {
        $input = $this->getInput();
        $errors = $this->validate($input, [
            'amount' => 'required',
            'payment_method' => 'required',
        ]);
        if ($errors) ApiResponse::validation($errors);

        $stmt = $this->db->prepare("INSERT INTO donations (user_id, campaign_id, amount, currency, payment_method, transaction_id, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())");
        $stmt->execute([
            $input['user_id'] ?? null,
            $input['campaign_id'] ?? null,
            $input['amount'],
            $input['currency'] ?? 'USD',
            $input['payment_method'],
            $input['transaction_id'] ?? null,
        ]);
        ApiResponse::success(['id' => (int) $this->db->lastInsertId()], 'Donation recorded', 201);
    }

    public function history(): void
    {
        if (!$this->authenticate()) return;
        $stmt = $this->db->prepare("SELECT d.*, c.title as campaign_title FROM donations d LEFT JOIN campaigns c ON d.campaign_id = c.id WHERE d.user_id = ? AND d.deleted_at IS NULL ORDER BY d.created_at DESC");
        $stmt->execute([$this->userId]);
        ApiResponse::success($stmt->fetchAll());
    }
}
