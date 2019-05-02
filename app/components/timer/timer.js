function timerCtrl($interval, $scope) {
  var ctrl = this;
  ctrl.$onInit = function () {
    const interval = ctrl.interval * 60000;
    const lastWatering = new Date(ctrl.lastWatering).getTime();
    ctrl.ttl = Math.floor((lastWatering + interval - Date.now()) / 1000);
  }
  ctrl.timer = $interval(function() {
      if (ctrl.ttl > 0) {
        ctrl.ttl--;
        return;
      }
      ctrl.ttl = 0;
      $interval.cancel(ctrl.timer);
      $scope.$emit("withered");
    }, 1000)

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