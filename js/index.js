let config = function(){
  return{
    MAX_GAME_TIME_IN_SEC: 40,
    COLUMNS: 5,
    ROWS: 5,
    REWARDS: 10
  }
}();

$(document).ready(function() {
  let defaultArea = new Area(config.COLUMNS, config.ROWS);
});

class Dot{
  constructor(column, row) {
    this.id = `point-row${row}-col${column}`;
    this.column = column;
    this.row = row;
  }
}

class Area{
  constructor(columns, rows) {
    this.points = [];
    this.createShapes(columns, rows);
    this.drawObjectsOnCanvas(this.points);
    this.setRandomWinDots(this.points);
  }

  createShapes(columns, rows) {
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        this.points.push(new Dot(row, column));
      }
    }
  }

  drawObjectsOnCanvas(shapes) {
    for (let i in shapes) {
      let shape = shapes[i];
      let newElement = $('<div>').attr(
        {id: shape.id}
      ).addClass("circle").data('win', false);
      $('#area').append(newElement);
    }
  }

  setRandomWinDots(shapes) {
    let rewardsLeft = config.REWARDS;
    if (shapes.length < config.REWARDS) {
      console.log('Error: Elements should be more than rewards')
      return
    }
    let allCircles = $('.circle');
    while (rewardsLeft > 0) {
      let randCircles = Math.floor((Math.random() * allCircles.length));
      $(allCircles[randCircles]).data('win', true);
      rewardsLeft -= 1;
    }

  }
}
