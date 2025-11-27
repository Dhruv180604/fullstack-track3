import React, { useState } from 'react';

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    await onCreate({ title, description: desc });
    setTitle('');
    setDesc('');
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" style={{ padding:8, width: '40%', marginRight:8 }} />
      <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" style={{ padding:8, width: '40%', marginRight:8 }} />
      <button type="submit" style={{ padding:8 }}>Add</button>
    </form>
  );
}
