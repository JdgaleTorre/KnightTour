function Square(x, y, resolution, color, context) {
  this.x = x;
  this.y = y;
  this.resolution = resolution;
  this.color = color;
  this.context = context;
  this.stepNumber = 0;
  this.visited = false;
}

Square.prototype.draw = function () {
  this.context.beginPath();
  this.context.lineWidth = 1;
  this.context.rect(
    this.x * this.resolution,
    this.y * this.resolution,
    this.resolution - 1,
    this.resolution - 1
  );
  this.context.strokeStyle = "#000000";
  if (this.color === Colors.WHITE) {
    this.context.fillStyle = "#FFF";
  } else {
    this.context.fillStyle = "#000000";
  }

  this.context.fill();
  this.context.stroke();
  this.context.closePath();
};

Square.prototype.drawKnight = function () {
  var img = new Image();
  img.src =
    this.color === Colors.WHITE
      ? "./assets/white-knight.png"
      : "./assets/black-knight.png";

  var spriteWidth = 100,
    spriteHeight = 100,
    pixelsLeft = 0,
    pixelsTop = 0,
    // Where are we going to draw
    // the sprite on the canvas
    canvasPosX = this.x * this.resolution,
    canvasPosY = this.y * this.resolution,
    context = this.context;
  img.onload = function () {
    context.drawImage(
      img,
      pixelsLeft,
      pixelsTop,
      spriteWidth,
      spriteHeight,
      canvasPosX,
      canvasPosY,
      spriteWidth,
      spriteHeight
    );
  };
};

Square.prototype.setValueKnight = function (knight) {
  this.hasKnight = knight;
  if (knight) {
    this.drawKnight();
  } else {
    this.removeKnight();
  }
};

Square.prototype.removeKnight = function () {
  this.context.clearRect(
    this.x * this.resolution,
    this.y * this.resolution,
    100,
    100
  );
  this.draw();
};

Square.prototype.drawNumber = function (number) {
  this.context.font = "30px Arial";
  if (this.color == Colors.WHITE) {
    this.context.fillStyle = "#000000";
  } else {
    this.context.fillStyle = "#FFF";
  }
  let x = (this.x * this.resolution) + (this.resolution/2);
  let y = (this.y * this.resolution) + (this.resolution/2);
  this.context.fillText(number, x,y);
};
