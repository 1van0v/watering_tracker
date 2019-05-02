function clockCtrl() {
  var ctrl = this;
  ctrl.$onChanges = function() {
    ctrl.seconds = String(ctrl.time % 60).padStart(2, "0");
    ctrl.minutes = String(Math.floor(ctrl.time / 60)).padStart(2, "0");
  }
}

angular.module("wateringTracker")
  .component("clock", {
    templateUrl: "components/timer/clock/clock.html",
    bindings: {
      time: "<time"
    },
    controller: clockCtrl
  })