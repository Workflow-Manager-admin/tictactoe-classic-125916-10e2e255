import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <a
              className="btn"
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              React Docs
            </a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ minHeight: '60vh', paddingTop: 120 }}>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;
