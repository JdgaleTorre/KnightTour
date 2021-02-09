function make2dArray(boardSize) {
  let arr = new Array(boardSize);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(boardSize);
  }
  return arr;
}

var Colors = {
  WHITE: 0,
  BLACK: 1,
};


new Board();