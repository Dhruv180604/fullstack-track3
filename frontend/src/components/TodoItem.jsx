import React from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  function toggleDone() {
    onUpdate(todo.id, { 
      title: todo.title, 
      description: todo.description, 
      done: !todo.done 
    });
  }

  return (
    <div style={{ padding: 10, border: '1px solid #ddd', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
      <div>
        <strong style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.title}</strong>
        <div style={{ fontSize: 13, color: '#444' }}>{todo.description}</div>
      </div>
      <div>
        <button onClick={toggleDone} style={{ marginRight:8 }}>{todo.done ? 'Undo' : 'Done'}</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}
