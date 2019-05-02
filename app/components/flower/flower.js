function flowerCtrl($scope, flowersFactory, $mdToast) {
  var ctrl = this;

  ctrl.$onInit = function() {
    function makeWithered() {
      ctrl.plant.status = "withered";
      flowersFactory.database.$save(ctrl.plant)
        .then(
          $mdToast.show(
            $mdToast.simple()
            .textContent(ctrl.plant.name + " has been withered")
            .position("top right")
            .hideDelay(3000)
          )
        )
    }
    $scope.$on("withered", makeWithered);
  }

}


angular.module("wateringTracker")
  .component("flower", {
    templateUrl: "components/flower/flower.html",
    bindings: {
      plant: "=plant"
    },
    controller: flowerCtrl
  });