(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('content', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    object: '='
                },
                template: '<div class="section"><h4>{{object.title}}</h4><chapter-content content="object.content"></chapter-content></div>'
            };
        }]);
})();