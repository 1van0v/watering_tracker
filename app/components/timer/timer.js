function timerCtrl($interval, $scope) {
  var ctrl = this;
  ctrl.$onChanges = function () {
    const lastWatering = new Date(ctrl.lastWatering).getTime();
    ctrl.ttl = Math.round((lastWatering + ctrl.interval - Date.now()) / 1000);
  }
  var timer = $interval(function() {
    if (ctrl.ttl > 0) {
      ctrl.ttl--;
      return;
    }
    ctrl.ttl = 0;
    $interval.cancel(timer);
    $scope.$emit("withered");
  }, 1000);
};

angular.module("wateringTracker")
  .component("timer", {
    templateUrl: "components/timer/timer.html",
    bindings: {
      interval: "<interval",
      lastWatering: "<lastWatering"
    },
    controller: timerCtrl
  });
