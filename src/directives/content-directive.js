'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .directive('content', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    object: '='
                },
                template: '<div class="section"><h4>{{object.title}}</h4><p id="chapterContent">{{object.content | toString}}</p></div>'
            };
        }]);
})();