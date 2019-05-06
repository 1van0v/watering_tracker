describe("Testing timer controller", function() {
  var $componentController;
  var ctrl;
  var scope;
  var $interval;

  function getTimer(lastWatering, interval) {
    var bindings = {
      interval: interval,
      lastWatering: lastWatering
    };
    ctrl = $componentController("timer", {$scope: scope}, bindings);
  }

  beforeEach(module("wateringTracker"));
  beforeEach(inject(function($rootScope, _$componentController_, _$interval_) {
    $interval = _$interval_;
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    spyOn(scope, "$emit");
  }));

  describe("with NULL input", function() {
    beforeEach(function() {
      getTimer(null, null);
      ctrl.$onChanges();
      $interval.flush(1000);
    });

    it("Should return 0 if NULL's received from parent", function() {
      expect(ctrl.ttl).toBe(0);
    });

    it("Should trigger Withered at the end of timer", function() {
      expect(scope.$emit).toHaveBeenCalledWith("withered");
    });

  })

  describe("with valid input", function() {
    beforeEach(function(){
      getTimer(Date.now(), 5000);
      ctrl.$onChanges();
    })

    it("Should decrease Timer every second by 1", function() {
      var prevTtl = ctrl.ttl;
      $interval.flush(1000);
      expect(prevTtl - ctrl.ttl).toBe(1);
      $interval.flush(3000);
      expect(ctrl.ttl).toBe(1);
    })

    it("Should trigger Withered at the end of timer", function() {
      $interval.flush(6000);
      expect(scope.$emit).toHaveBeenCalledWith("withered");
    });
  })
});
