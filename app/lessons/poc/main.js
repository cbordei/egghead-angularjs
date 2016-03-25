var app = angular.module('MyApp', []);

app.factory('Form', ['$http', function($http) {
    function Form(formData) {
        if (formData) {
          this.setData(formData);
        } else {
          this.setData({
            template: {
              name: '',
              label: '',
              type: 'StructuredMessage::Widgets::Form',
              widgets: [
              ]
            }
          });
        }
    };
    Form.prototype = {
        setData: function(formData) {
            angular.extend(this, formData);
        },
        load: function(id) {
            var scope = this;
            // $http.get('ourserver/books/' + bookId).success(function(formData) {
            //     scope.setData(formData);
            // });
        },
        delete: function() {
            // $http.delete('ourserver/books/' + bookId);
        },
        update: function() {
            // $http.put('ourserver/books/' + bookId, this);
        },

    };
    return Form;
}]);

app.factory('Widget', function() {
    function Widget(type) {
        this.setData({
            name: '',
            label: '',
            type: type,
            mandatory: false,
        });
    };
    Widget.prototype = {
        setData: function(inputData) {
            angular.extend(this, inputData);
        }
    };
    return Widget;
});

app.factory('Section', function() {
    function Section(type) {
        this.setData({
            name: '',
            label: '',
            type: 'StructuredMessage::Widgets::Section',
            widgets: []
        });
    };
    Section.prototype = {
        setData: function(inputData) {
            angular.extend(this, inputData);
        }
    };
    return Section;
});

function FormCtrl($scope, Form) {
  $scope.form = new Form();
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


app.directive("buttons", ['Widget', 'Section', function(Widget, Section) {
  return {
    restrict: "E",
    transclude:true,
    templateUrl:'crud_buttons.html',
    link: function(scope) {
      scope.addSubSection = function(item) {
        section = new Section();
        item.widgets.push(section);
      }

      scope.addSubItem = function(item) {
        widget = new Widget('StructuredMessage::Widgets::Input');
        item.widgets.push(widget);
      }

    }
  };
}]);

app.directive("edit", function() {
  return {
    restrict: "E",
    transclude:true,
    templateUrl: "edit_buttons.html",
    link: function(scope) {
      scope.isEditEnabled = true;

      scope.toggleEdit = function(item) {
        scope.isEditEnabled = !scope.isEditEnabled;
      }

      scope.deleteMe = function(items, position) {
        items.splice(position, 1);
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
        return item.type == 'StructuredMessage::Widgets::Checkbox' || item.type == 'StructuredMessage::Widgets::Radio'
      }

      scope.isFormElement = function(item) {
        return item.type == 'StructuredMessage::Widgets::Input' ||
          item.type == 'StructuredMessage::Widgets::Checkbox' ||
          item.type == 'StructuredMessage::Widgets::Radio'
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
        return item.type == 'StructuredMessage::Widgets::Checkbox' || item.type == 'StructuredMessage::Widgets::Radio'
      }
    }
  }
});
