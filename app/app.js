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

wateringTracker.factory("updateItem", function(flowersFactory, $mdToast) {
  return function(item, action) {
    flowersFactory.database.$save(item)
      .then(
        $mdToast.show(
          $mdToast.simple()
          .textContent(item.name + " has been " + action)
          .position("top right")
          .hideDelay(3000)
        )
      )
  }
})

wateringTracker.controller("wateringTrackerCtr", 
  function($scope, updateItem, flowersFactory) {

  $scope.plants =  flowersFactory.database;
  $scope.revive = function() {
    $scope.plants.forEach((item) => {
      if (item.status === "withered") {
        item.status = "watered";
        item.last_watering = Date.now();
        updateItem(item, "revived");
      }
    })
  }
  
})
