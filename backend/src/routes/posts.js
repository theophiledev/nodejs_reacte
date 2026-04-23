const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // GET all posts
  router.get('/', async (req, res) => {
    try {
      const posts = await prisma.post.findMany({ include: { author: true } });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create post
  router.post('/', async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
      const post = await prisma.post.create({
        data: { title, content, authorId: parseInt(authorId) }
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PUT update post
  router.put('/:id', async (req, res) => {
    const { title, content, published } = req.body;
    try {
      const post = await prisma.post.update({
        where: { id: parseInt(req.params.id) },
        data: { title, content, published }
      });
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE post
  router.delete('/:id', async (req, res) => {
    try {
      await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
