import React from 'react';

function formatDate(iso){
  if(!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch { return iso; }
}

export default function TodoItem({ todo, onUpdate, onDelete }) {
  function toggleDone() {
    onUpdate(todo.id, { title: todo.title, description: todo.description, done: !todo.done });
  }

  return (
    <div className={`todo ${todo.done ? 'done' : ''}`}>
      <div className="todo-left">
        <div className="avatar">{(todo.title || 'T').slice(0,2).toUpperCase()}</div>
        <div className="todo-body">
          <h3 className="todo-title">{todo.title}</h3>
          <div className="todo-desc">{todo.description || 'No description'}</div>
          <div style={{fontSize:12, color:'var(--muted)', marginTop:8}}>{formatDate(todo.created_at)}</div>
        </div>
      </div>

      <div className="actions">
        <button className="small" onClick={toggleDone}>{todo.done ? 'Undo' : 'Done'}</button>
        <button className="small" style={{background:'transparent', color:'var(--danger)', border:'1px solid rgba(255,255,255,0.04)'}} onClick={()=>onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}
