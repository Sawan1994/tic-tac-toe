export const isMovesLeft = (board) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "_") {
        return true;
      }
    }
  }
  return false;
};

export const evaluate = (board) => {
  // check if any rows has all three marks of same player
  for (let row = 0; row < board.length; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      if (board[row][0] === "x") {
        return 10;
      } else if (board[0][2] === "0") {
        return -10;
      }
    }
  }

  // check if any cols has all three marks of same player
  for (let col = 0; col < board[0].length; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      if (board[0][col] === "x") {
        return 10;
      } else if (board[0][2] === "0") {
        return -10;
      }
    }
  }

  // check if any diagonal has all three marks of same player
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === "x") {
      return 10;
    } else if (board[0][2] === "0") {
      return -10;
    }
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === "x") {
      return 10;
    } else if (board[0][2] === "0") {
      return -10;
    }
  }

  // if no one has won return 0
  return 0;
};

const minimax = (board, player, opponent, isMaximisingPlayer) => {
  const score = evaluate(board);

  // if any of the players has already won
  if (score === 10 || score === -10) {
    return score;
  }

  // if no moves left, the game is a draw
  if (!isMovesLeft(board)) {
    return score;
  }

  let best = isMaximisingPlayer ? -1000 : 1000;

  // traverse through each empty cell and check for best possible outcome
  if (isMaximisingPlayer) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === "_") {
          board[row][col] = player;
          const bestValue = minimax(board, player, opponent, false);
          board[row][col] = "_";

          if (bestValue > best) {
            best = bestValue;
          }
        }
      }
    }

    return best;
  } else {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === "_") {
          board[row][col] = opponent;
          const bestValue = minimax(board, player, opponent, true);
          board[row][col] = "_";

          if (bestValue < best) {
            best = bestValue;
          }
        }
      }
    }

    return best;
  }
};

export const findBestMove = (
  board,
  player,
  opponent,
  isMaximisingPlayer = true
) => {
  let bestValue = isMaximisingPlayer ? -1000 : 1000;
  let bestMove = [-1, -1];

  // traverse each cell and find best move
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // if cell is not empty, don't do anything
      if (board[row][col] === "_") {
        board[row][col] = player;
        const moveVal = minimax(board, player, opponent, !isMaximisingPlayer);
        board[row][col] = "_";
        if (isMaximisingPlayer) {
          if (moveVal > bestValue) {
            bestValue = moveVal;
            bestMove = [row, col];
          }
        } else {
          if (moveVal < bestValue) {
            bestValue = moveVal;
            bestMove = [row, col];
          }
        }
      }
    }
  }

  return bestMove;
};
