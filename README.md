# 2.3.2 — Data Migration Pipeline
## Node.js + React + PostgreSQL + Prisma + CI/CD

---

## 📋 Full Step-by-Step Guide (14 Steps)

---

### STEP 1 — Install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo service postgresql start
```

---

### STEP 2 — Create Database and User

```bash
# Enter PostgreSQL shell
sudo -u postgres psql

# Inside psql shell, run:
CREATE USER theo WITH PASSWORD '1234';
CREATE DATABASE mydb OWNER theo;
GRANT ALL PRIVILEGES ON DATABASE mydb TO theo;

# List all databases
\l
\l+

# Or using SQL
SELECT datname FROM pg_database;

# Exit
\q
```

---

### STEP 3 — Install UI App (DBeaver)

```bash
sudo apt install dbeaver -y
# Open DBeaver → New Connection → PostgreSQL
# Host: localhost | Port: 5432 | DB: mydb | User: theo | Pass: 1234
```

---

### STEP 4 — Install and Init Prisma

```bash
# Inside the backend folder:
cd backend
npm install
npx prisma init
```

This creates:
- `prisma/schema.prisma` — your database schema
- `.env` — your DATABASE_URL

---

### STEP 5 — Import Prisma in Node.js

Already done in `backend/src/index.js`:
```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

---

### STEP 6 — Install Axios

```bash
cd frontend
npm install axios
```

Axios is used in `frontend/src/App.jsx` to make GET/POST requests:
```js
const res = await axios.get('http://localhost:5000/api/users');
const res = await axios.post('http://localhost:5000/api/users', { name, email });
```

---

### STEP 7 — Configure ENV Path

Edit `backend/.env`:
```env
DATABASE_URL="postgresql://theo:1234@localhost:5432/mydb"
PORT=5000
```

---

### STEP 8 — Migrate Database Schema

```bash
cd backend
npx prisma db push
```

This creates the `User` and `Post` tables in your PostgreSQL database.

To view your data in a browser GUI:
```bash
npx prisma studio
# Opens at http://localhost:5555
```

---

### STEP 9 — Configure Database on Remote Server (AWS EC2)

```bash
# SSH into your server
ssh -i your-key.pem ubuntu@YOUR_AWS_IP

# Install PostgreSQL on server
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo service postgresql start
```

---

### STEP 10 — Configure PostgreSQL Path from Local ENV in Server

On AWS server, edit PostgreSQL config:
```bash
sudo nano /etc/postgresql/15/main/postgresql.conf
# Change: listen_addresses = '*'

sudo nano /etc/postgresql/15/main/pg_hba.conf
# Add: host all all 0.0.0.0/0 md5

sudo service postgresql restart
```

Update backend `.env` for production:
```env
DATABASE_URL="postgresql://theo:1234@YOUR_AWS_IP:5432/mydb"
```

---

### STEP 11 — Create Database on Server (Same Name as Local)

```bash
# On AWS server:
sudo -u postgres psql
CREATE USER theo WITH PASSWORD '1234';
CREATE DATABASE mydb OWNER theo;
# Must be same name as local: mydb
\q
```

---

### STEP 11b — Run the App Locally First

```bash
# Terminal 1 — Backend
cd backend
npm install
npx prisma db push
npm run dev
# → Runs at http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm install
npm start
# → Runs at http://localhost:3000
```

---

### STEP 12 — Configure CI/CD (GitHub Actions)

1. Push project to GitHub:
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nodejs-react.git
git push -u origin main
```

2. Add GitHub Secrets (Settings → Secrets → Actions):
   - `AWS_HOST` → Your EC2 public IP
   - `AWS_USER` → `ubuntu`
   - `AWS_SSH_KEY` → Content of your `.pem` file

The CI/CD file is at `.github/workflows/deploy.yml`

---

### STEP 13 — Commit and Push New Changes

```bash
# STEP 13: git add . + git commit -am "added db migrate"
git add .
git commit -am "added db migrate"
git push origin main
```

---

### STEP 14 — CI/CD Job Starts Deployment

After pushing:
1. Go to GitHub → Actions tab
2. Watch the workflow run automatically
3. It will:
   - ✅ Start PostgreSQL test container
   - ✅ Install dependencies
   - ✅ Run `prisma db push`
   - ✅ Build React frontend
   - ✅ SSH into AWS and deploy

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       ← Database schema
│   ├── src/
│   │   ├── index.js            ← Express server
│   │   └── routes/
│   │       ├── users.js        ← /api/users
│   │       └── posts.js        ← /api/posts
│   ├── .env                    ← DATABASE_URL
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx             ← Main app + Axios
│   │   ├── App.css
│   │   └── components/
│   │       ├── UserForm.jsx
│   │       ├── UserList.jsx
│   │       ├── PostForm.jsx
│   │       └── PostList.jsx
│   └── package.json
└── .github/
    └── workflows/
        └── deploy.yml          ← CI/CD pipeline
```

---

## 🔗 API Endpoints

| Method | Endpoint          | Description      |
|--------|-------------------|------------------|
| GET    | /api/users        | List all users   |
| POST   | /api/users        | Create user      |
| DELETE | /api/users/:id    | Delete user      |
| GET    | /api/posts        | List all posts   |
| POST   | /api/posts        | Create post      |
| PUT    | /api/posts/:id    | Update post      |
| DELETE | /api/posts/:id    | Delete post      |

---

## 🛠 Technologies Used

| Tool         | Purpose                          |
|--------------|----------------------------------|
| PostgreSQL   | Relational database              |
| Prisma       | ORM to connect Node.js to DB     |
| Express.js   | Backend REST API server          |
| React.js     | Frontend UI                      |
| Axios        | HTTP requests from React to API  |
| DBeaver      | GUI for PostgreSQL               |
| GitHub Actions | CI/CD pipeline automation      |
| AWS EC2      | Cloud server deployment          |
