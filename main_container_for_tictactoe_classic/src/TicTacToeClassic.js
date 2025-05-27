import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main container component for TicTacToe Classic.
 * Manages the game board, player turns, win/tie state, and UI for playing the game.
 */
function TicTacToeClassic() {
  // Board is an array of 9 cells, each null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // Current player: 'X' starts, then alternates with 'O'
  const [currentPlayer, setCurrentPlayer] = useState('X');
  // null if ongoing, 'X'/'O' if win, 'Tie' if tied
  const [gameStatus, setGameStatus] = useState(null);

  // PUBLIC_INTERFACE
  /**
   * Handle a move at given cell.
   * @param {number} idx - Index in board (0-8)
   */
  function handleCellClick(idx) {
    if (board[idx] || gameStatus) return; // Can't play if occupied or game over

    const newBoard = board.slice();
    newBoard[idx] = currentPlayer;
    const winner = calculateWinner(newBoard);
    if (winner) {
      setBoard(newBoard);
      setGameStatus(winner); // 'X' or 'O'
      return;
    }
    if (newBoard.every(cell => cell)) {
      setBoard(newBoard);
      setGameStatus('Tie');
      return;
    }
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  // PUBLIC_INTERFACE
  /**
   * Reset the game to initial state.
   */
  function handleReset() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameStatus(null);
  }

  // PUBLIC_INTERFACE
  /**
   * Calculate if there's a winner given a board state.
   * @param {Array} board - 9-element board
   * @returns 'X' | 'O' | null
   */
  function calculateWinner(board) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6] // diags
    ];
    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  // Render board cells
  function renderCell(idx) {
    return (
      <button
        key={idx}
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        disabled={!!board[idx] || !!gameStatus}
        aria-label={`Cell ${idx + 1}`}
      >
        {board[idx]}
      </button>
    );
  }

  // UI messaging
  let statusText = '';
  if (gameStatus === 'Tie') {
    statusText = "It's a tie!";
  } else if (gameStatus === 'X' || gameStatus === 'O') {
    statusText = `Player ${gameStatus} wins!`;
  } else {
    statusText = `Current turn: Player ${currentPlayer}`;
  }

  return (
    <div className="ttt-container">
      <h2 className="ttt-title">TicTacToe Classic</h2>
      <div className="ttt-status">{statusText}</div>
      <div className="ttt-board">
        {Array(9).fill(null).map((_, idx) => renderCell(idx))}
      </div>
      <button className="btn btn-large" onClick={handleReset} style={{marginTop: 20}}>
        Reset Game
      </button>
      <style>{`
        .ttt-container {
          background: var(--kavia-dark);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 16px 0 rgba(0,0,0,0.18);
          margin: 36px auto 0 auto;
          max-width: 320px;
          text-align: center;
        }
        .ttt-title {
          color: var(--kavia-orange);
          margin-bottom: 0.5rem;
        }
        .ttt-status {
          font-weight: 500;
          min-height: 2rem;
          color: var(--text-color);
          margin-bottom: 1rem;
        }
        .ttt-board {
          display: grid;
          grid-template-columns: repeat(3, 64px);
          grid-template-rows: repeat(3, 64px);
          gap: 8px;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .ttt-cell {
          width: 64px;
          height: 64px;
          font-size: 2.4rem;
          font-weight: 600;
          color: var(--kavia-orange);
          background: var(--kavia-dark);
          border: 2px solid var(--kavia-orange);
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.1s, color 0.1s, border 0.1s;
        }
        .ttt-cell:disabled {
          color: var(--text-secondary);
          border-color: var(--border-color);
          background: #232323;
          cursor: default;
        }
      `}</style>
    </div>
  );
}

export default TicTacToeClassic;
