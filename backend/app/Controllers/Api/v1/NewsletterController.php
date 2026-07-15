<?php
namespace Controllers;

use Libraries\ApiResponse;

class NewsletterController extends BaseApiController
{
    public function subscribe(): void
    {
        $input = $this->getInput();
        if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            ApiResponse::error('Valid email required', 400);
        }
        $email = $this->sanitize($input['email']);
        $stmt = $this->db->prepare("SELECT id FROM newsletter_subscribers WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            ApiResponse::error('Already subscribed', 409);
        }
        $this->db->prepare("INSERT INTO newsletter_subscribers (email, status, subscribed_at) VALUES (?, 'active', NOW())")->execute([$email]);
        ApiResponse::success(null, 'Subscribed successfully', 201);
    }

    public function unsubscribe(): void
    {
        $input = $this->getInput();
        if (empty($input['email'])) ApiResponse::error('Email required', 400);
        $this->db->prepare("UPDATE newsletter_subscribers SET status = 'inactive', unsubscribed_at = NOW() WHERE email = ?")->execute([$input['email']]);
        ApiResponse::success(null, 'Unsubscribed successfully');
    }
}
