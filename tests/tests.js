QUnit.module("Unit Tests", function() {

  QUnit.test("check number of generated circles", function(assert) {
    let area = new Area(5, 5, 10);
    assert.equal(area.points.length, 25);
  });
  QUnit.test("check number of attempts", function(assert) {
    let area = new Area(5, 5, 100);
    assert.notOk(false, "detected more attempts than elements" );
  });

  QUnit.test("discovered empty dot", function(assert) {
    let newElement = $('<div>').attr({id: 1}).addClass("circle").data(
      'win', false);
    $('body').append(newElement);
    $('.circle').on('click', dotClicked);
    $('.circle').trigger('click');
    assert.ok($('.circle').hasClass("empty"), "empty dot class added");
  });
  QUnit.test("discovered gold dot", function(assert) {
    let newElement = $('<div>').attr({id: 1}).addClass("circle").data(
      'win', true);
    $('body').append(newElement);
    $('.circle').on('click', dotClicked);
    $('.circle').trigger('click');
    assert.ok($('.circle').hasClass("found"), "gold dot class added");
  });

});
