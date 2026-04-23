// STEP 5: Import Prisma in Node.js application
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes(prisma));
app.use('/api/posts', postRoutes(prisma));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Data Migration Pipeline API running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
