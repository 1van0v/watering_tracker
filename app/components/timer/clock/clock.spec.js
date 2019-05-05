describe("Testing clock controller", function() {
  var $componentController;
  var scope = {};
  var ctrl;

  function getClock(seconds) {
    var bindings = {time: seconds};
    ctrl = $componentController("clock", null, bindings);
    ctrl.$onChanges();
  }

  beforeEach(module("wateringTracker"));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it("Minutes should be equal to 01 and Seconds to 01", function() {
    getClock(61);
    var desiredResult = "01"
    expect(ctrl.seconds).toEqual(desiredResult);
    expect(ctrl.minutes).toEqual(desiredResult);
  });

  it("Minutes and Seconds should be equal to 0", function() {
    getClock();
    var desiredResult = "00"
    expect(ctrl.seconds).toEqual(desiredResult);
    expect(ctrl.minutes).toEqual(desiredResult);
  });

  it("Seconds should be less than 60", function(){
    getClock(60)
    expect(ctrl.seconds).toEqual("00");
    expect(ctrl.minutes).toEqual("01");
  });

  it("Seconds max value should be 59", function() {
    getClock(59);
    expect(ctrl.seconds).toEqual("59");
    expect(ctrl.minutes).toEqual("00");
  })
});
