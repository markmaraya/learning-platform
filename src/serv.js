'use strict';

(function () {    
    angular.module('CodeApp', ['ui.bootstrap']);

    angular.module('CodeApp')
        .controller('CodeAppController', ['$scope', function ($scope) {
            $scope.htmlCode = '<div ng-controller="myController">\n\t<h1 ng-bind="x"></h1>\n</div>';
            $scope.scriptCode ='angular.module("myApp", []);\nangular.module("myApp")\n\t.controller("myController", ["$scope", function ($scope) {\n\t\t$scope.x = "This is a String";\n\t}]);';
        }]);
})();