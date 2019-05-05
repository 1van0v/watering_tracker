var wateringTracker = angular.module("wateringTracker", ["ngMaterial", "firebase"]);

wateringTracker.config(function($mdThemingProvider) {
  $mdThemingProvider.theme("default")
    .primaryPalette("light-green")
    .accentPalette("amber");
});

wateringTracker.factory("flowersFactory", function($http, $firebaseArray) {
  var config = {
    apiKey: "AIzaSyCzYjlewlCw0CK0DUQTd2j3LkeUj1EusjU",
    authDomain: "iv-test-db.firebaseapp.com",
    databaseURL: "https://iv-test-db.firebaseio.com",
    projectId: "iv-test-db",
    storageBucket: "iv-test-db.appspot.com",
    messagingSenderId: "151360496041"
  };

  var firebaseRef = firebase.initializeApp(config).database().ref();

  return {
   database : $firebaseArray(firebaseRef)
  }
});

wateringTracker.factory("updateItem", function(flowersFactory, showToast) {
  return function(item, action) {
    flowersFactory.database.$save(item)
      .then(
        showToast(item, action)
      )
  }
})

wateringTracker.factory("showToast", function($mdToast) {
  return function(item, action) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(item.name + " has been " + action)
      .position("top right")
      .hideDelay(3000)
    )
  }
})

wateringTracker.controller("wateringTrackerCtr",
  function($scope, updateItem, flowersFactory, $mdDialog) {

  $scope.plantStates = ["all", "watered", "withered"];
  $scope.plantState = "all";
  $scope.plants =  flowersFactory.database;
  $scope.revive = function() {
    $scope.plants.forEach((item) => {
      if (item.status === "withered") {
        item.watering_interval = Math.floor(Math.random() * (15 - 5) + 5)
        item.status = "watered";
        item.last_watering = Date.now();
        updateItem(item, "revived");
      }
    })
  }

  $scope.showForm = function(ev) {
    $mdDialog.show({
      templateUrl: "components/add-new-plant/add-new-plant.html",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
  };
})

wateringTracker.filter("filterPlants", function() {
  return function(items, condition) {
    var filtered = [];
    if(condition === undefined ||
        condition === "" ||
        condition === "all"){
      return items;
    }
    angular.forEach(items, function(item) {
      if(condition === item.status){
        filtered.push(item);
      }
    });
    return filtered;
  };
});
