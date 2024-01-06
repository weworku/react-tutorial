import { SetStateAction, useState } from 'react';
import './App.css';

/**
 * タイックタックトーボード内のマスを表します
 * @param value - マスの値（'X'、'O'、またはnull）
 * @param onSquareClick - マスがクリックされたときに呼び出される関数。
 */

function Square({ value, onSquareClick }: { value: string, onSquareClick: () => void }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

/**
 * タイックタックトーボードを表します。
 */
function Board() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

  /**
   * マスがクリックされたときのイベントを処理します。
   * @param i - クリックされたマスのインデックス
   */
  function handleClick(i: number) {
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
  }

  return (
    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/**
 * Represents the main application component.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
      </header>
    </div>
  );
}

export default App;
