var app = angular.module("app", []);

// app.factory("game", function () {
//   return {
//     title: "StarCraft"
//   };
// });

// app.config(function ($provide) {
//   $provide.factory("game", function () {
//     return {
//       title: "StarCraft"
//     };
//   });
// });

// app.config(function ($provide) {
//   $provide.provider("game", function () {
//     return {
//       $get: function () {
//         return {
//           title: "StarCraft"
//         };
//       }
//     };
//   });
// });

app.provider("game", function () {
  var type;
  return {
    setType: function(value) {
      type = value;
    },
    isEnabled: function(value) {

    },

    $get: function () {
      return {
        title: type + "Craft"
      };
    }
  };
});

app.config(function (gameProvider) {
  if gameProvider.isEnabled {
    gameProvider.setType("War");
  }
});

app.controller("AppCtrl", function ($scope, game) {
  $scope.title = game.title;
});
