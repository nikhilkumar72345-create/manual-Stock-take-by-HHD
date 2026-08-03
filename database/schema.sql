CREATE DATABASE IF NOT EXISTS manual_stock_take;

USE manual_stock_take;

-- Employee Table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(30) UNIQUE NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    password VARCHAR(255),
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- WSN Master Table
CREATE TABLE wsn_master (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wsn VARCHAR(100) UNIQUE NOT NULL,
    model VARCHAR(100),
    location VARCHAR(100),
    status ENUM('Pending','Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignment Table
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(30) NOT NULL,
    wsn VARCHAR(100) NOT NULL,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scan_status ENUM('Pending','Scanned') DEFAULT 'Pending'
);

-- Scan History
CREATE TABLE scan_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(30),
    wsn VARCHAR(100),
    scan_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    device_name VARCHAR(100),
    remarks VARCHAR(255)
);