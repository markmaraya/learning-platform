'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .directive('repeatLink', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="" ng-repeat="lesson in list" ng-click="choiceFunction($index)">{{lesson | capitalize}}</a>'
            };
        }]);
})();