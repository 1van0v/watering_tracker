angular.module("wateringTracker")
  .component("flower", {
    templateUrl: "components/flower/flower.html",
    bindings: {
      plant: "=plant"
    }
  });