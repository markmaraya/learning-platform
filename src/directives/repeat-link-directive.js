'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .directive('repeatLink', function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="" ng-repeat="topics in list" ng-click="choiceFunction(topics | spaceless)">{{topics | capitalize}}</a>'
            };
        });
})();