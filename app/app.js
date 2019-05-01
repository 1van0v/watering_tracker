var wateringTracker = angular.module("wateringTracker", []);

wateringTracker.controller("wateringTrackerCtr", function($scope) {
  $scope.wateringIcon = "//static1.squarespace.com/static/596830ffb11be19a5cc9e549/t/5970b2d4d7bdcebd7f5a46df/1500558043509/watering+icon";
  $scope.message = "Watering Tracker App";
})