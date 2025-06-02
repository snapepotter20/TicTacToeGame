import React from 'react';
import './App.css';
import Block from './components/Block';

function App() {
   
  const [state, setState] = React.useState<string[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = React.useState<'X' | 'O'>('X');

  function calculateWinner(state: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a];
    }
  }
  return null;
}

  const handleBlockClick = (index: number) => {
    if (state[index]) {
      return alert('Block already filled'); // Block already filled
    }
    const winner = calculateWinner(state);
    if (winner) {
      return alert(`Game Over! ${winner} wins!`); // Game already won
    }
    if (state.every(block => block !== null)) {
      return alert('Game Over! It\'s a draw!'); // All blocks filled
    }
    const newState = [...state];
    newState[index] = currentTurn;
    setState(newState);
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
  };

  const reset = () => {
    setState(Array(9).fill(null));
    setCurrentTurn('X');
  };

  return (
    <div className="board">
      <div className='header'>
        <h1>Tic Tac Toe</h1>
        <h2>Current Turn: {currentTurn}</h2>
      </div>
      <div className='board-container'>
       <div className='row'>
        <Block value={state[0]} onClick={() => handleBlockClick(0)} />
        <Block value={state[1]} onClick={() => handleBlockClick(1)} />
        <Block value={state[2]} onClick={() => handleBlockClick(2)} />
       </div>
       <div className='row'>
        <Block value={state[3]} onClick={() => handleBlockClick(3)} />
        <Block value={state[4]} onClick={() => handleBlockClick(4)} />
        <Block value={state[5]} onClick={() => handleBlockClick(5)} />
       </div>
       <div className='row'>
        <Block value={state[6]} onClick={() => handleBlockClick(6)} />
        <Block value={state[7]} onClick={() => handleBlockClick(7)} />
        <Block value={state[8]} onClick={() => handleBlockClick(8)} />
       </div>
      </div>
       <div className='btn' onClick={()=>reset()}>Play Again</div>
    </div>
  );
}

export default App;


