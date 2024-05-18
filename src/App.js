import { useEffect, useState } from "react";

import { evaluate, findBestMove, isMovesLeft } from "./utils/minimaxalgorithm";

import "./App.css";

const DEFAULT_BOARD_STATE = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

const PLAYER_A = "x";
const PLAYER_B = "o";

function App() {
  const [board, setBoard] = useState(DEFAULT_BOARD_STATE);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const score = evaluate(board);

    if (score === 10) {
      setWinner(`${PLAYER_B} won`);
      setIsGameRunning(false);
    }

    if (score === -10) {
      setWinner(`${PLAYER_A} won`);
      setIsGameRunning(false);
    }

    if (score === 0) {
      if (!isMovesLeft(board)) {
        setWinner("Draw");
        setIsGameRunning(false);
      }
    }
  }, [board]);

  const handleGridClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== "_" || !isGameRunning) {
      return;
    }
    let tempBoard = JSON.parse(JSON.stringify(board));
    tempBoard[rowIndex][colIndex] = PLAYER_A;
    const move = findBestMove(tempBoard, PLAYER_A, PLAYER_B, true);
    tempBoard[move[0]][move[1]] = PLAYER_B;
    setBoard(tempBoard);
  };

  console.log("board : ", board);
  return (
    <div className="App">
      {!isGameRunning ? <h1>{winner}</h1> : null}
      <div className="gridContainer">
        {[1, 2, 3]?.map((_, rowIndex) => {
          return [1, 2, 3]?.map((_, colIndex) => {
            return (
              <div
                className="gridItem"
                onClick={() => handleGridClick(rowIndex, colIndex)}
                key={Math.random()}
              >
                {board[rowIndex][colIndex] !== "_"
                  ? board[rowIndex][colIndex]
                  : ""}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default App;
