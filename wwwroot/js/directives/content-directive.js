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
                template: '<div class="section"><h4>{{object.title}}</h4><p>{{object.content}}</p><br /><h4 ng-show="object.sample">Sample</h4><p id="contentSample">{{object.sample | toString}}</p></div>'
            };
        }]);
})();