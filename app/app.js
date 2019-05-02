var wateringTracker = angular.module("wateringTracker", ['ngMaterial']);

wateringTracker.config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
      .primaryPalette("light-green")
      .accentPalette("amber");
  })

wateringTracker.controller("wateringTrackerCtr", function($scope, $http) {
  $http.get("data.json").then((response) => {
    $scope.plants = response.data.map((item) => {item.last_watering = Date.now(); return item});
  })
})