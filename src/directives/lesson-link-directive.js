'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .directive('lessons', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="#main" ng-click="getPath(lessons)" ng-repeat="lessons in list"><div class="lesson-div bg-primary"><img alt="Sample Image"><label>{{lessons}}</label></div></a>'
            };
        }]);
})();