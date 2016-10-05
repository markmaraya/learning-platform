(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('chapterContent', ['$compile', function ($compile) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    content: '='
                },
                link: function (scope, element) {
                    scope.$watch('content', function (newValue) {
                        if (newValue !== undefined) {
                            var template = $compile('<div id="chapterContent">' + scope.content + '</div>')(scope);
                            element.empty().append(template);
                        }
                    });
                }
            };
        }]);
})();