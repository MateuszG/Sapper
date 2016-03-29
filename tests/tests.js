QUnit.module("Unit Tests", function() {
  QUnit.test("check number of generated circles", function(assert) {
    let area = new Area(5, 5, 10);
    assert.equal(area.points.length, 25);
  });
  QUnit.test("check number of attempts", function(assert) {
    let area = new Area(5, 5, 100);
    assert.notOk(false, "detected that there is more attempts than elements" );
  });
});
