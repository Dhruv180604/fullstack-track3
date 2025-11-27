import React from 'react';
import TodoList from './components/TodoList';

export default function App(){
  return (
    <div className="app">
      <div className="header">
        <div className="title">
          <div className="logo">TD</div>
          <div>
            <h1>Todo App — Fullstack Track 3</h1>
            <p className="sub">A clean, responsive todo UI — React + Express + SQLite</p>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <small className="sub">Quick demo • Add, finish, delete</small>
        </div>
      </div>

      <div className="card">
        <TodoList />
      </div>
    </div>
  );
}
