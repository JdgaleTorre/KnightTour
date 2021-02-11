function visitNextPosition(x, y, board) {
  const copiedBoard = copyBoard(board);
  copiedBoard[x][y] = true;

  let moves = knightMove(copiedBoard,x, y);
  if (moves.length === 0) {
    if (entireBoardVisited(copiedBoard)) return [[x, y]];
    else return false;
  }

  moves = warnsdorff(copiedBoard, moves);

  for (let [nextX, nextY] of moves) {
    let path = visitNextPosition(nextX, nextY, copiedBoard);
    if (!!path) {
      path.push([x, y]);
      return path;
    }
  }
  return false;
}

function knightMove(board, x, y) {
  let moves = [];
  // possibles moves
  let posibleMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  for (let [offsetX, offsetY] of posibleMoves) {
    const newX = x + offsetX;
    const newY = y + offsetY;

    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !board[newX][newY]) {
      moves.push([newX, newY]);
    }
  }

  return moves;
}

function warnsdorff(board, moves) {
  const weightedMoves = [];
  for (const [x, y] of moves) {
    const weight = knightMove(board, x, y).length;
    weightedMoves.push({ move: [x, y], weight });
  }
  return weightedMoves
    .sort((a, b) => a.weight - b.weight)
    .map((weighted) => weighted.move);
}
