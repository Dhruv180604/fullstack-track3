import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  async function fetchTodos() {
    setErr('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/todos`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error(e);
      setErr('Could not load todos. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ fetchTodos(); }, []);

  async function handleCreate(todo) {
    await fetch(`${API}/api/todos`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(todo)
    });
    await fetchTodos();
  }

  async function handleUpdate(id, payload) {
    await fetch(`${API}/api/todos/${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    await fetchTodos();
  }

  async function handleDelete(id) {
    await fetch(`${API}/api/todos/${id}`, { method:'DELETE' });
    await fetchTodos();
  }

  return (
    <div>
      <TodoForm onCreate={handleCreate} />

      {loading && <div className="empty">Loading todos…</div>}
      {err && <div className="empty">{err}</div>}

      {!loading && todos.length === 0 && <div className="empty">No todos yet — add your first item ✨</div>}

      <div className="list" role="list">
        {todos.map(t => (
          <TodoItem key={t.id} todo={t} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
