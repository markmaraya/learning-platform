(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('lessons', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="#lesson/{{lessons.title | spaceless}}" ng-repeat="lessons in list"><div class="lesson-div bg-primary"><i class="mdi mdi-{{lessons.icon}} mdi-48px"></i><h1>{{lessons.title}}</h1></div></a>'
            };
        }]);
})();