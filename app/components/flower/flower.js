function flowerCtrl($scope, updateItem, updateItem, flowersFactory, showToast, $mdDialog) {
  var ctrl = this;

  ctrl.$onInit = function() {
    function makeWithered() {
      ctrl.plant.status = "withered";
      updateItem(ctrl.plant, "withered");
    }
    $scope.$on("withered", makeWithered);
  }

  $scope.water = function(ev) {
    var item = ctrl.plant;
    if (item.status !== "withered") {
      item.last_watering = Date.now();
      updateItem(item, "watered");
      return;
    }
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Cannot water ' + item.name)
        .textContent('There is no reason to water a withered plant')
        .ok('Got it!')
        .targetEvent(ev)
    );
  }

  

  $scope.delete = function(ev) {
    var item = ctrl.plant;
    var confirm = $mdDialog.confirm()
      .title("Would you like to delete " + item.name + "?")
      .textContent("A deleted flower could not be restored.")
      .targetEvent(ev)
      .ok("Delete " + item.name)
      .cancel("Cancel");
    $mdDialog.show(confirm).then(function() {
      flowersFactory.database.$remove(item)
        .then(showToast(item, "deleted"))
    })
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