function Board() {
  this.boardSize = 8;
  this.board = make2dArray(this.boardSize);
  this.canvas;
  this.context;
  this.resolution;

  this.print();
  this.addEvents();
}

Board.prototype.print = function () {
  this.canvas = document.getElementById("game");
  this.canvas.setAttribute("width", this.canvas.offsetWidth);
  this.canvas.setAttribute("height", this.canvas.offsetWidth);
  this.context = this.canvas.getContext("2d");
  this.resolution = this.canvas.offsetWidth / this.boardSize;

  for (let i = 0; i < this.boardSize; i++) {
    for (let j = 0; j < this.boardSize; j++) {
      let color = Colors.WHITE; // 0 == white 1 == black
      if (i % 2 === 0) {
        if (j % 2 !== 0) {
          color = Colors.BLACK;
        }
      } else {
        if (j % 2 === 0) {
          color = Colors.BLACK;
        }
      }
      this.board[i][j] = new Square(i, j, this.resolution, color, this.context);
      this.board[i][j].draw();
    }
  }
};

Board.prototype.addEvents = function () {
  var _this = this;

  this.canvas.addEventListener("mousedown", async function (evt) {
    _this.cleanBoard();

    let x = Math.floor(evt.offsetX / _this.resolution);
    let y = Math.floor(evt.offsetY / _this.resolution);
    _this.board[x][y].setValueKnight(true);

    let board = initializeBoard(8);

    let result = visitNextPosition(x, y, board).reverse();

    let contador = 1;
    let lastX = -1;
    let lastY = -1;

    for (let [x, y] of result) {
      _this.board[x][y].drawKnight();
      if (lastX > -1 && lastY > -1) {
        _this.board[lastX][lastY].removeKnight();
        _this.board[lastX][lastY].drawNumber(contador - 1);
      }

      contador++;
      lastX = x;
      lastY = y;
      await sleep(1000);
    }
  });
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Board.prototype.cleanBoard = function () {
  this.board.map((row) => row.map((column) => column.setValueKnight(false)));
};

function copyBoard(board) {
  return board.map((column) => column.slice());
}

function initializeBoard(boardSize) {
  return [...Array(boardSize)].map((v) =>
    [...Array(boardSize)].map((v) => false)
  );
}

function entireBoardVisited(board) {
  return board.every((column) => column.every((square) => square));
}
