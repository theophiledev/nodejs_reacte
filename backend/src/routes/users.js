const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // GET all users
  router.get('/', async (req, res) => {
    try {
      const users = await prisma.user.findMany({ include: { posts: true } });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET single user
  router.get('/:id', async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { posts: true }
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create user
  router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
      const user = await prisma.user.create({ data: { name, email } });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE user
  router.delete('/:id', async (req, res) => {
    try {
      await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
