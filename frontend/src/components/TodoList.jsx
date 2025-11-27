import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTodos() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error('Fetch todos error', e);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTodos(); }, []);

  async function handleCreate(todo) {
    await fetch(`${API}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    fetchTodos();
  }

  async function handleUpdate(id, payload) {
    await fetch(`${API}/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    fetchTodos();
  }

  async function handleDelete(id) {
    await fetch(`${API}/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  }

  return (
    <div>
      <TodoForm onCreate={handleCreate} />
      {loading ? <p>Loading...</p> : (
        <>
          {todos.length === 0 ? <p>No todos yet</p> : todos.map(t => (
            <TodoItem key={t.id} todo={t} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </>
      )}
    </div>
  );
}
