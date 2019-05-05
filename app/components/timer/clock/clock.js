function clockCtrl() {
  var ctrl = this;

  ctrl.$onChanges = function() {
    ctrl.displayTime(ctrl.time);
  }

  ctrl.displayTime = function(seconds) {
    var checkedSeconds = checkNumber(seconds);
    ctrl.seconds = parseSeconds(checkedSeconds);
    ctrl.minutes = parseMinutes(checkedSeconds);
  }

  function parseSeconds(seconds) {
    return addZeros(seconds % 60);
  }

  function parseMinutes(seconds) {
    return addZeros(Math.floor(seconds / 60));
  }
  function checkNumber(seconds) {
    if (+seconds !== seconds) {
      return 0;
    }
    return seconds;
  }

  function addZeros(num) {
    return String(num).padStart(2, "0");
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
