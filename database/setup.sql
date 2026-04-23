-- ============================================
-- STEP 2: PostgreSQL Database Setup
-- Run in psql as postgres superuser
-- ============================================

-- Create the user
CREATE USER theo WITH PASSWORD '1234';

-- Create the database
CREATE DATABASE mydb OWNER theo;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO theo;

-- Verify: list all databases
\l

-- Connect to mydb
\c mydb

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO theo;

-- Verify connection works
SELECT current_database(), current_user, version();
