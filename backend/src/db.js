// backend/src/db.js  (pure Node JSON file DB — no native deps)
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const dbFile = path.join(dataDir, 'db.json');

async function readData() {
  try {
    const txt = await fsp.readFile(dbFile, 'utf8');
    return JSON.parse(txt);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // file missing -> initialize
      const init = { todos: [], lastId: 0 };
      await writeData(init);
      return init;
    }
    throw err;
  }
}

async function writeData(data) {
  await fsp.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf8');
}

// helpers

async function initDB() {
  await readData(); // ensures file exists
}

async function getAllTodos() {
  const data = await readData();
  // return newest first
  return data.todos.slice().reverse();
}

async function getTodoById(id) {
  const data = await readData();
  return data.todos.find(t => t.id === Number(id)) || null;
}

async function createTodo({ title, description }) {
  const data = await readData();
  data.lastId = (data.lastId || 0) + 1;
  const todo = {
    id: data.lastId,
    title,
    description: description || '',
    done: false,
    created_at: new Date().toISOString()
  };
  data.todos.push(todo);
  await writeData(data);
  return todo;
}

async function updateTodo(id, { title, description, done }) {
  const data = await readData();
  const idx = data.todos.findIndex(t => t.id === Number(id));
  if (idx === -1) return null;
  const todo = data.todos[idx];
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (done !== undefined) todo.done = !!done;
  await writeData(data);
  return todo;
}

async function deleteTodo(id) {
  const data = await readData();
  const initialLen = data.todos.length;
  data.todos = data.todos.filter(t => t.id !== Number(id));
  const changed = data.todos.length !== initialLen;
  if (changed) await writeData(data);
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
