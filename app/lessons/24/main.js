var app = angular.module("app", []);

app.controller("zControoler", function($scope){
    $scope.model = {};
    $scope.xx = [
      1,3,2,4
    ];

});

app.directive("zippy", function() {
  return {
    restrict: "E",
    template:'<div><h3 ng-click="addStuff(x)">{{x}}</h3><div ng-show="isContentVisible">Hello world {{data.content}}</div>{{child}}</div>',
    link: function (scope) {
      scope.isContentVisivle = true;
      scope.toggleContent = function () {
        scope.isContentVisible = !scope.isContentVisible;
      };
      scope.addStuff = function (x) {
        new Model = {
          ss
          // XXX:
        }
        scope.xx.push(x + 4)
      };
    }
  };
});
