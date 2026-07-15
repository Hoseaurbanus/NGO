-- SmugFlex Database Schema
-- MySQL / MariaDB
-- Import into your existing database (mdpjhtua_NGO)

-- Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin','admin','editor','volunteer_manager','program_manager','finance_officer','content_manager','event_manager','donor_manager','volunteer','member','viewer') NOT NULL DEFAULT 'volunteer',
    avatar VARCHAR(500) NULL,
    phone VARCHAR(50) NULL,
    status ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active',
    email_verified TINYINT(1) DEFAULT 0,
    two_factor_enabled TINYINT(1) DEFAULT 0,
    last_login_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Programs
CREATE TABLE IF NOT EXISTS programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image VARCHAR(500) NULL,
    status ENUM('active','inactive') NOT NULL DEFAULT 'active',
    sort_order INT DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image VARCHAR(500) NULL,
    budget DECIMAL(15,2) NULL,
    funding_partner VARCHAR(255) NULL,
    status ENUM('ongoing','completed','upcoming') NOT NULL DEFAULT 'ongoing',
    location VARCHAR(255) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Events
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    image VARCHAR(500) NULL,
    location VARCHAR(255) NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NULL,
    capacity INT NULL,
    registration_required TINYINT(1) DEFAULT 1,
    status ENUM('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_start_date (start_date)
) ENGINE=InnoDB;

-- News
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT NULL,
    image VARCHAR(500) NULL,
    category VARCHAR(100) DEFAULT 'general',
    author_id INT NULL,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_category (category)
) ENGINE=InnoDB;

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    image VARCHAR(500) NULL,
    goal_amount DECIMAL(15,2) NOT NULL,
    raised_amount DECIMAL(15,2) DEFAULT 0,
    start_date DATE NULL,
    end_date DATE NULL,
    status ENUM('active','completed','paused') NOT NULL DEFAULT 'active',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Donations
CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    campaign_id INT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method ENUM('online','bank_transfer','check','cash') NOT NULL DEFAULT 'online',
    transaction_id VARCHAR(255) NULL,
    status ENUM('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
    receipt_url VARCHAR(500) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Volunteers
CREATE TABLE IF NOT EXISTS volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    skills TEXT NULL,
    availability VARCHAR(100) NULL,
    experience TEXT NULL,
    resume_url VARCHAR(500) NULL,
    status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL,
    video_url VARCHAR(500) NULL,
    category VARCHAR(100) NULL,
    type ENUM('photo','video') NOT NULL DEFAULT 'photo',
    sort_order INT DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_category (category),
    INDEX idx_type (type)
) ENGINE=InnoDB;

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NULL,
    content TEXT NOT NULL,
    image VARCHAR(500) NULL,
    rating INT DEFAULT 5,
    is_featured TINYINT(1) DEFAULT 0,
    status ENUM('active','inactive') NOT NULL DEFAULT 'active',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Partners
CREATE TABLE IF NOT EXISTS partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500) NULL,
    url VARCHAR(500) NULL,
    description TEXT NULL,
    type VARCHAR(100) DEFAULT 'partner',
    status ENUM('active','inactive') NOT NULL DEFAULT 'active',
    sort_order INT DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Careers
CREATE TABLE IF NOT EXISTS careers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    department VARCHAR(100) NULL,
    type ENUM('full-time','part-time','contract','internship') NOT NULL DEFAULT 'full-time',
    location VARCHAR(255) NULL,
    salary_range VARCHAR(100) NULL,
    status ENUM('active','closed','draft') NOT NULL DEFAULT 'active',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Applications
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    career_id INT NULL,
    user_id INT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cover_letter TEXT NULL,
    cv_url VARCHAR(500) NULL,
    status ENUM('pending','reviewed','shortlisted','rejected') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    replied_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    INDEX idx_is_read (is_read)
) ENGINE=InnoDB;

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('active','inactive') NOT NULL DEFAULT 'active',
    subscribed_at DATETIME NOT NULL,
    unsubscribed_at DATETIME NULL,
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Settings
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) NOT NULL UNIQUE,
    value TEXT NULL,
    `group` VARCHAR(100) DEFAULT 'general',
    updated_at DATETIME NULL,
    INDEX idx_key (`key`),
    INDEX idx_group (`group`)
) ENGINE=InnoDB;

-- Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NULL,
    entity_id INT NULL,
    details TEXT NULL,
    ip_address VARCHAR(45) NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB;

-- Insert default admin user
INSERT INTO users (name, email, password_hash, role, status, email_verified, created_at, updated_at)
VALUES ('Admin', 'admin@smugflex.org', '$2y$12$LJ3m4ris7Hke5dmPwnYx3OKl2P3w4L5Z3F2q8k9j0l1m2n3o4p5', 'super_admin', 'active', 1, NOW(), NOW());

-- Insert default settings
INSERT INTO settings (`key`, value, `group`, updated_at) VALUES
('site_name', 'SmugFlex', 'general', NOW()),
('site_tagline', 'Impact. Redefined.', 'general', NOW()),
('site_email', 'info@smugflex.org', 'general', NOW()),
('site_phone', '+1 (555) 123-4567', 'general', NOW()),
('site_address', '123 Impact Avenue, New York, NY 10001', 'general', NOW()),
('donation_goal', '500000', 'donations', NOW()),
('currency', 'USD', 'general', NOW());
