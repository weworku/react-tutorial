import { SetStateAction, useState } from 'react';
import './App.css';
import internal from 'stream';

/**
 * タイックタックトーボード内のマスを表します
 * @param value - マスの値（'X'、'O'、またはnull）
 * @param onSquareClick - マスがクリックされたときに呼び出される関数。
 */
interface SquareProps{
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

interface BoardProps{
  numRows: number;
  numCols: number;
}
/**
 * タイックタックトーボードを表します。
 */
export const Board = ({numRows, numCols}: BoardProps) => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<string[]>(Array());

  /**
   * マスがクリックされたときのイベントを処理します。
   * @param i - クリックされたマスのインデックス
   */
  function handleClick(i: number) {
    const newSquares = squares.slice();
    if(newSquares[i]){
      return;
    }
    let v = xIsNext ? 'X' : 'O';
    newSquares[i] = v;
    console.debug(`i=${i}, before=${squares} after=${newSquares}`)
    setSquares(newSquares);
    setXIsNext(!xIsNext);
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

/**
 * Represents the main application component.
 */
export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Board numCols={5} numRows={3}  />
      </header>
    </div>
  );
}

