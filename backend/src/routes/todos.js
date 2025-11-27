const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all todos
router.get('/', (req, res) => {
  const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
  const todos = stmt.all();
  res.json(todos);
});

// Get single todo
router.get('/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
  const todo = stmt.get(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

// Create todo
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const stmt = db.prepare('INSERT INTO todos (title, description) VALUES (?, ?)');
  const info = stmt.run(title, description || '');
  const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newTodo);
});

// Update todo
router.put('/:id', (req, res) => {
  const { title, description, done } = req.body;
  const stmt = db.prepare('UPDATE todos SET title = ?, description = ?, done = ? WHERE id = ?');
  const info = stmt.run(title, description, done ? 1 : 0, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  const updated = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// Delete todo
router.delete('/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;