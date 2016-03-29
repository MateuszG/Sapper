config = function(){
  return{
    MAX_GAME_TIME_IN_SEC: 40,
    COLUMNS: 5,
    ROWS: 5,
    ATTEMPTS: 10
  }
}();

function dotClicked(e) {
  config.ATTEMPTS -= 1;

  if (config.ATTEMPTS > 0) {
    let element = e.target;
    if (!(($(element).hasClass('empty')) || $(element).hasClass('empty'))) {
      if ($(element).data('win') === true) {
        $(element).addClass("found");
        $('#area').append($('<div>').addClass("label").text('You win'));
        $('.circle').hide();
      } else {
        $(element).addClass("empty");
      }
    }
  } else if (config.ATTEMPTS == 0) {
    $('#area').append($('<div>').addClass("label").text('You lose'));
    $('.circle').hide();
  }
  $('#attempts').text(config.ATTEMPTS);
}

$(document).ready(function() {
  $('#attempts').text(config.ATTEMPTS);
  new Area(config.COLUMNS, config.ROWS);
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
    this.setRandomWinDot(this.points);
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

  setRandomWinDot(shapes) {
    if (shapes.length < config.ATTEMPTS) {
      console.log('Error: Elements should be more than attempts!')
      return
    }
    let allCircles = $('.circle');
    let winCircle = Math.floor((Math.random() * allCircles.length));
    $(allCircles[winCircle]).data('win', true);
    $('.circle').on('click', dotClicked);
  }
}
