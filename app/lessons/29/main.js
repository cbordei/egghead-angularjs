var app = angular.module("app", []);

app.config(function ($routeProvider) {
  $routeProvider.when('/',
    {
      templateUrl: "app.html",
      controller:"AppCtrl"
    }
  );
  $routeProvider.when('/sss',
    {
      templateUrl: "app2.html",
      controller:"AppCtrl"
    }
  );
});

app.controller("AppCtrl", function ($scope) {
  $scope.model = {
    message: "This is my app"
  };
});
