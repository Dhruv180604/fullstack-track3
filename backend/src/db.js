// backend/src/db.js  (lowdb, pure JS)
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const { Low, JSONFile } = require('lowdb');

const dataDir = join(__dirname, '..', 'data');
if (!existsSync(dataDir)) mkdirSync(dataDir);

const file = join(dataDir, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// initialize DB
async function initDB() {
  await db.read();
  db.data = db.data || { todos: [], lastId: 0 };
  await db.write();
}

// helper functions
async function getAllTodos() {
  await db.read();
  return db.data.todos.slice().reverse(); // newest first
}

async function getTodoById(id) {
  await db.read();
  return db.data.todos.find(t => t.id === Number(id)) || null;
}

async function createTodo({ title, description }) {
  await db.read();
  db.data.lastId = (db.data.lastId || 0) + 1;
  const todo = {
    id: db.data.lastId,
    title,
    description: description || '',
    done: false,
    created_at: new Date().toISOString()
  };
  db.data.todos.push(todo);
  await db.write();
  return todo;
}

async function updateTodo(id, { title, description, done }) {
  await db.read();
  const idx = db.data.todos.findIndex(t => t.id === Number(id));
  if (idx === -1) return null;
  const todo = db.data.todos[idx];
  todo.title = title ?? todo.title;
  todo.description = description ?? todo.description;
  todo.done = typeof done === 'boolean' ? done : todo.done;
  await db.write();
  return todo;
}

async function deleteTodo(id) {
  await db.read();
  const initialLength = db.data.todos.length;
  db.data.todos = db.data.todos.filter(t => t.id !== Number(id));
  const changed = db.data.todos.length !== initialLength;
  if (changed) await db.write();
  return changed;
}

module.exports = {
  initDB,
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
