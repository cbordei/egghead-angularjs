var app = angular.module('MyApp', []);

app.factory('Form', function () {
  var Form = {};
  Form = {
        name: 'first one',
        template: {
          name: 'form',
          label: 'superform',
          type: 'StructuredMessage::Widgets::Form',
          widgets: [
              {
              name: 'person',
              label: 'contact persons',
              type: 'StructuredMessage::Widgets::Section',
              repeatable: true,
              widgets: [
                  {
                  name: 'full_name',
                  label: 'Full Name of person',
                  type: 'StructuredMessage::Widgets::Input',
                  },
                  {
                  name: 'last_name',
                  label: 'last Name of person2',
                  type: 'StructuredMessage::Widgets::Input',
                  mandatory: true,
                  }
                ]
              }
            ]
          }
        };
  return Form;
});

function FormCtrl($scope, Form) {
  $scope.form = Form;
  $scope.widgetTypes = [
    'StructuredMessage::Widgets::Input',
    'StructuredMessage::Widgets::Checkbox',
    'StructuredMessage::Widgets::Radio'
  ]
  $scope.isArray =  angular.isArray;

  $scope.item = {
    widgets: [$scope.form.template]
  }

}

// app.directive("widget", function() {
//   return {
//     restrict: "E",
//     transclude:true,
//     templateUrl:'widget_stas.html',
//     link: function (scope) {
//       // scope.isContentVisivle = true;
//       // scope.toggleContent = function () {
//       //   scope.isContentVisible = !scope.isContentVisible;
//       // };
//       scope.addSiblingItem = function(items, position) {
//         items.splice(position + 1, 0, {
//           name: 'full_name',
//           label: 'Full Name of person',
//           type: 'StructuredMessage::Widgets::Input',
//         });
//       }
//
//       scope.addSubSection = function(item) {
//         item.widgets.push({
//           name: 'full_name',
//           label: 'Full Name of person',
//           type: 'StructuredMessage::Widgets::Section',
//           mandatory: false,
//           widgets: []
//         });
//       }
//     }
//   };
// });

app.directive("buttons", function() {
  return {
    restrict: "E",
    transclude:true,
    templateUrl:'crud_buttons.html',
    link: function(scope) {
      scope.addSubSection = function(item) {
        item.widgets.push({
          name: 'full_name',
          label: 'contact persons',
          type: 'StructuredMessage::Widgets::Section',
          mandatory: false,
          widgets: []
        });
      }

      scope.addSubItem = function(item) {
        item.widgets.push({
          name: 'full_name',
          label: 'Full Name of person',
          type: 'StructuredMessage::Widgets::Input',
          mandatory: false,
        });
      }

      scope.addSiblingItem = function(items, position) {
        items.splice(position + 1, 0, {
          name: 'full_name',
          label: 'Full Name of person',
          type: 'StructuredMessage::Widgets::Input',
        });
      }

      scope.deleteMe = function(items, position) {
        items.splice(position, 1);
      }
    }
  };
});

app.directive("edit", function() {
  return {
    restrict: "E",
    transclude:true,
    templateUrl: "edit_buttons.html",
    link: function(scope) {
      scope.isEditEnabled = false;

      scope.toggleEdit = function(item) {
        scope.isEditEnabled = !scope.isEditEnabled;
      }
    }
  };
});

app.directive("widgettype", function () {
  return {
    restrict: "E",
    transclude:true,
    templateUrl: "widget_type_select.html"
  }
});

app.directive("editwidget", function () {
  return {
    restrict: "E",
    transclude:true,
    templateUrl: "edit_widget.html",
    link: function(scope) {
      scope.hasCollection = function(item) {
        return item.hasOwnProperty('collection')
      }

      scope.addOption = function(item) {
        if(!item.hasOwnProperty('collection')) {
          item.collection = []
        }
        item.collection.push({
          label: ''
        });
      }
    }
  }
});

app.directive("showwidget", function () {
  return {
    restrict: "E",
    transclude:true,
    templateUrl: "show_widget.html",
    link: function(scope) {
      scope.hasCollection = function(item) {
        return item.hasOwnProperty('collection')
      }
    }
  }
});
