describe("Testing addPlantCtrl", function(){
  var scope;
  var ctrl;
  var $mdDialog;
  var flowersFactory;

  // module("wateringTracker");
  // inject(function($rootScope, $controller, _$mdDialog_) {
  //   $mdDialog = _$mdDialog_;
  //   scope = $rootScope.$new();
  //   $controller("addPlantCtrl", {$scope: scope});
  // });
  beforeEach(module("wateringTracker"));
  beforeEach(inject(function($rootScope, $controller, _$mdDialog_, _flowersFactory_) {
    scope = $rootScope.$new();
    $mdDialog = _$mdDialog_;
    flowersFactory = _flowersFactory_;
    ctrl = $controller("addPlantCtrl", {$scope: scope});
  }))

  // it("Should create hide(), cancel(), answer() and addPlant() functions", function() {
  //   expect(scope.hide).toBeDefined();
  //   expect(scope.cancel).toBeDefined();
  //   expect(scope.answer).toBeDefined();
  //   expect(scope.addPlant).toBeDefined();
  // });

  // it("Should invoke $mdDialog.hide() during hide() call", function() {
  //   spyOn($mdDialog, "hide");
  //   scope.hide();
  //   expect($mdDialog.hide).toHaveBeenCalled();
  // });

  // it("Should invoke $mdDialog.cancel() during cancel() call", function() {
  //   spyOn($mdDialog, "cancel");
  //   scope.cancel();
  //   expect($mdDialog.cancel).toHaveBeenCalled();
  // });
  // TODO
  //the above tests do not work due to the following error.
  // [DEFAULT]: Firebase: Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  it("Should invoke $mdDialog.hide() during answer() call", function() {
    spyOn($mdDialog, "hide");
    scope.answer();
    expect($mdDialog.hide).toHaveBeenCalled();
  });

  // TODO
  // uncompleted test
  // it("Should pass a new plant to firebase service", function() {
  //   spyOn(flowersFactory.database, "$add");
  //   var newItem = {
  //     name: "a new plant name",
  //     img: "http://someurl.com",
  //     watering_inter: 5
  //   };
  //
  //   scope.item = newItem;
  //   console.log(ctrl);
  //   debugger;
  //   scope.addPlant();
  //   console.log(flowersFactory.database.$add.calls());
  //   expect(flowersFactory.database.$add).toHaveBeenCalled();
  // });

})
