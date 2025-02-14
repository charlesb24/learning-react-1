export default function GameBoard({ onSelectSquare, board }) {


  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //
  // function handleSelectSquare(row, col) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map(arr => [...arr])];
  //
  //     updatedBoard[row][col] = activePlayerSymbol;
  //
  //     return updatedBoard;
  //   });
  //
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      { board.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          { row.map((symbol, colIndex) => (
            <li key={colIndex}>
              <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={symbol !== null}>
                { symbol }
              </button>
            </li>
          )) }
        </ol>
      </li>) }
    </ol>
  );
}