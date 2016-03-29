config = function(){
  return{
    MAX_GAME_TIME_IN_SEC: 40,
    COLUMNS: 5,
    ROWS: 5,
    ATTEMPTS: 10,
    area: {},
    interval: {}
  }
}();

function dotClicked(e) {
  let element = e.target;
  if (!(($(element).hasClass('empty')) || $(element).hasClass('empty'))) {
    config.ATTEMPTS -= 1;
  }

  if (config.ATTEMPTS > 0) {
    if ($(element).data('win') === true) {
      $(element).addClass("found");
      config.area.gameOver('win');
    } else {
      $(element).addClass("empty");
    }
  } else if (config.ATTEMPTS == 0) {
    $(element).addClass("empty");
    config.area.gameOver('lose');
  }
  $('#attempts').text(config.ATTEMPTS);
}

$(document).ready(function() {
  $('#attempts').text(config.ATTEMPTS);
  config.area = new Area(config.COLUMNS, config.ROWS, config.ATTEMPTS);
  startTimer(config.MAX_GAME_TIME_IN_SEC, $('#seconds'));
});

class Dot{
  constructor(column, row) {
    this.id = `point-row${row}-col${column}`;
    this.column = column;
    this.row = row;
  }
}

class Area{
  constructor(columns, rows, attempts) {
    this.points = [];
    this.createShapes(columns, rows);
    this.appendShapes(this.points);
    this.setRandomDotAsWin(this.points, attempts);
  }

  createShapes(columns, rows) {
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        this.points.push(new Dot(row, column));
      }
    }
  }

  appendShapes(shapes) {
    for (let i in shapes) {
      let shape = shapes[i];
      let newElement = $('<div>').attr(
        {id: shape.id}
      ).addClass("circle").data('win', false);
      $('#area').append(newElement);
    }
  }

  setRandomDotAsWin(shapes, attempts) {
    if (shapes.length < attempts) {
      console.log('Error: Elements should be more than attempts!')
      return false
    }
    let allCircles = $('.circle');
    let winCircle = Math.floor((Math.random() * allCircles.length));
    $(allCircles[winCircle]).data('win', true);
    $('.circle').on('click', dotClicked);
  }

  gameOver(state) {
    $('#area').append($('<div>').addClass("label").text(`You ${state}!`));
    clearInterval(config.interval);
  }
}

function startTimer(duration, display) {
  display.text(duration);
  config.interval = setInterval(function () {
    display.text(duration);
    if (--duration < 0) {
        config.area.gameOver('lose');
    }
  }, 1000);
}
