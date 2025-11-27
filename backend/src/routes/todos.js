// backend/src/routes/todos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// ensure DB initialized (optional)
db.initDB().catch(console.error);

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await db.getAllTodos();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Get single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await db.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// Create todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    const created = await db.createTodo({ title, description });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const updated = await db.updateTodo(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.deleteTodo(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
