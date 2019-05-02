function flowerCtrl($scope, updateItem, updateItem) {
  var ctrl = this;

  ctrl.$onInit = function() {
    function makeWithered() {
      ctrl.plant.status = "withered";
      updateItem(ctrl.plant, "withered");
    }
    $scope.$on("withered", makeWithered);
  }

  $scope.water = function() {
    var item = ctrl.plant;
    if (item.status !== "withered") {
      item.last_watering = Date.now();
      updateItem(item, "watered");
    }
    
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