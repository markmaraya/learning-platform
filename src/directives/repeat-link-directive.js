(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('repeatLink', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="" ng-repeat="lesson in list" ng-click="lessonCont.choiceFunction(lesson)">{{lesson | capitalize}}</a>'
            };
        }]);
})();