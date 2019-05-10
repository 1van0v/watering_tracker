describe("Testing addPlantCtrl", function(){
  var scope;
  var ctrl;
  var $mdDialog;
  var flowersFactory;
  var inputData;

  function getAddNewPlantDialog(item) {
    inject(function($rootScope, $controller, _$mdDialog_, _flowersFactory_) {
      scope = $rootScope.$new();
      scope.plant = item;
      $mdDialog = _$mdDialog_;
      flowersFactory = _flowersFactory_;
      ctrl = $controller("addPlantCtrl", {$scope: scope});
    });

    spyOn(flowersFactory.database, "$add").and.callFake(function() {
      return Promise.resolve();
    });
  };

  beforeEach(function() {
    angular.mock.module("wateringTracker");
    MockFirebase.override();
  });

  describe("Initialization", function(){

    beforeEach(function() {
      getAddNewPlantDialog({});
    });

    it("Should create hide(), cancel(), answer() and addPlant() functions", function() {
      expect(scope.hide).toBeDefined();
      expect(scope.cancel).toBeDefined();
      expect(scope.answer).toBeDefined();
      expect(scope.addPlant).toBeDefined();
    });

    it("Should invoke $mdDialog.hide() during hide() call", function() {
      spyOn($mdDialog, "hide");
      scope.hide();
      expect($mdDialog.hide).toHaveBeenCalled();
    });

    it("Should invoke $mdDialog.cancel() during cancel() call", function() {
      spyOn($mdDialog, "cancel");
      scope.cancel();
      expect($mdDialog.cancel).toHaveBeenCalled();
    });

    it("Should invoke $mdDialog.hide() during answer() call", function() {
      spyOn($mdDialog, "hide");
      scope.answer();
      expect($mdDialog.hide).toHaveBeenCalled();
    });

    it("A new plant should be in Watered state", function() {
      scope.addPlant();
      expect(scope.plant.status).toEqual("watered");
    })

    it("Should call flowersFactory.database.$add method", function() {
      scope.addPlant();
      expect(flowersFactory.database.$add).toHaveBeenCalledWith(scope.plant);
    })
  });

  describe("Input Data", function() {

    beforeEach(function() {
      inputData = {
        watering_interval: 5,
        name: "testName",
        img: "http://test"
      };
      getAddNewPlantDialog(Object.assign({}, inputData));
    })

    it("watering_interval should be sent to DB in milliseconds", function() {
      scope.addPlant();
      expect(scope.plant.watering_interval).toEqual(inputData.watering_interval * 60000);
    })

    it("img URL should start with 'http'", function() {
      scope.addPlant();
      expect(scope.plant.img.startsWith("http")).toEqual(true);
    })

  })
})
