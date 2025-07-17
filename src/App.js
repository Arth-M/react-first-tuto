import {useState} from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const history = [];

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i]="X";
      // setXIsNext(false);
    }
    else {
      nextSquares[i]="O";
      // setXIsNext(true);
    }
    onPlay(nextSquares)
  }
  // history.push(squares);
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // function FrSquare(y) {
  //   const frontSquares = []
  //     for (const i of [0,1,2]) {
  //       frontSquares.push(<Square value={squares[i+y.y]} onSquareClick={()=> handleClick(i+y.y)} key={(i+y.y)*10}/>);
  //     }
  //   return frontSquares;
  // }
  // function BoardRows () {
  //   const board = [];
  //   for (const y of [0,3,6]) {
  //     console.log(y);
  //     board.push(<div className='board-row' key={y*10}><FrSquare y={y} /></div>);
  //   }
  //   return board
  // }

  let b = []
  for (let i=0; i < 3; i++) {
    console.log(i);
    let sq = []
    for (let j = 0; j < 3; j++) {
      sq.push(<Square value={squares[i + 3*j]} onSquareClick={() => handleClick(i + 3*j)} />)
    }
    let divRow = <div className="board-row">{sq}</div>
    b.push(divRow)
  }
  let board = <div>{b}</div>

  return (
    <>
      <div className="status">{status}</div>
      {board}
      {/* <BoardRows /> */}
      {/* <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=> handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div> */}

    </>
  );
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0 && move != currentMove) {
      description = 'Go to move ' + move;
    } else if (move > 0 && move === currentMove){
      description = 'You are at move ' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
