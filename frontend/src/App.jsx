import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 12 }}>
      <h1>Todo App — Fullstack Track 3</h1>
      <TodoList />
    </div>
  );
}

export default App;
