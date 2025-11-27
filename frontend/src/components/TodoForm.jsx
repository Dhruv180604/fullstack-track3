import React, { useState } from 'react';

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) { alert('Please enter a title'); return; }
    setLoading(true);
    try {
      await onCreate({ title: title.trim(), description: desc.trim() });
      setTitle(''); setDesc('');
    } catch (err) {
      console.error(err);
      alert('Could not create todo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={e=>setTitle(e.target.value)}
      />
      <input
        className="input input--desc"
        placeholder="Description (optional)"
        value={desc}
        onChange={e=>setDesc(e.target.value)}
      />
      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}
