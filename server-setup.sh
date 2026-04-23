#!/bin/bash
# ============================================
# STEP 9 & 10: AWS EC2 Server Setup Script
# Run once on a fresh Ubuntu 22.04 EC2 server
# ============================================

echo "🚀 Setting up Data Migration Pipeline server..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database user and DB (STEP 11 — same name as local)
sudo -u postgres psql <<EOF
CREATE USER theo WITH PASSWORD '1234';
CREATE DATABASE mydb OWNER theo;
GRANT ALL PRIVILEGES ON DATABASE mydb TO theo;
EOF

# Allow remote connections (STEP 10)
PG_VERSION=$(psql --version | awk '{print $3}' | cut -d. -f1)
PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"

sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" $PG_CONF
echo "host all all 0.0.0.0/0 md5" | sudo tee -a $PG_HBA
sudo systemctl restart postgresql

# Install PM2 (process manager to keep app running)
sudo npm install -g pm2

# Clone the project
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/nodejs-react.git
cd nodejs-react

# Setup backend
cd backend
cp .env.example .env
# Edit .env with production DATABASE_URL
sed -i 's|YOUR_USER|theo|; s|YOUR_PASSWORD|1234|; s|YOUR_DB|mydb|' .env

npm install
npx prisma db push
npm run seed

# Start backend with PM2
pm2 start src/index.js --name "backend"
pm2 save
pm2 startup

echo "✅ Server setup complete!"
echo "   Backend running at: http://$(curl -s ifconfig.me):5000"
