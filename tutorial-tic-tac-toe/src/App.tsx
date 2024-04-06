import { SetStateAction, useState } from 'react';
import './App.css';
import internal from 'stream';

/**
 * タイックタックトーボード内のマスを表します
 * @param value - マスの値（'X'、'O'、またはnull）
 * @param onSquareClick - マスがクリックされたときに呼び出される関数。
 */
type SquareProps = {
  value: string;
  onSquareClick: () => void;
  disabled: boolean;
}
const Square = ({ value, onSquareClick, disabled }: SquareProps) => {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

type BoardProps = {
  numRows: number;
  numCols: number;
  xIsNext: boolean;
  squares: Squares;
  onPlay: (squares: string[]) => void;
}

/**
 * タイックタックトーボードを表します。
 */
export const Board = ({ numRows, numCols, xIsNext, squares, onPlay }: BoardProps) => {
  /**
   * マスがクリックされたときのイベントを処理します。
   * @param i - クリックされたマスのインデックス
   */
  function handleClick(i: number) {
    const newSquares = squares.slice();
    if (newSquares[i]) {
      return;
    }
    let v = xIsNext ? 'X' : 'O';
    newSquares[i] = v;
    console.debug(`i=${i}, before=${squares} after=${newSquares}`)
    onPlay(newSquares);
  }

  return (
    <div className='board'>
      {Array.from({ length: numRows }, (_, row) => (
        <div key={row} className='board-row'>
          {Array.from({ length: numCols }, (_, col) => {
            const key = row * numCols + col;
            return <Square
              key={key}
              value={squares[key]}
              onSquareClick={() => handleClick(key)}
              disabled={false}
            />
          })}
        </div>
      ))}
    </div>
  );
}


type Squares = string[];

/**
 * Represents the main application component.
 */
const App = () => {
  const [x, y] = [5, 3];
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<Squares[]>([Array(x * y).fill(null)]); // 盤面の配列を持ち、履歴にする
  const [currentMove, setCurrentMove] = useState(0); // 現在ユーザが見ているのが何番目の着手であるのか
  const currentSquares: Squares = history[currentMove];

  function handlePlay(nextSquares: Squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
    

  return (
    <div className="game">
      <div className="game-board">
        {/* <Board numCols={x} numRows={y} /> */}
        <Board numCols={x} numRows={y} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>Go to move #{move}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;