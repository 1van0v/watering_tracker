angular.module("wateringTracker")
  .controller("addPlantCtrl", function($scope, $mdDialog, flowersFactory, showToast) {

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.addPlant = function() {
      var item = $scope.plant;
      item.status = "watered";
      item.watering_interval *= 60000;
      item.last_watering = Date.now();
      flowersFactory.database.$add(item)
        .then(function() {
          $scope.hide();
          showToast(item, "added")
        });
    }
  })
