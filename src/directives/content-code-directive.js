(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('contentCode', [function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    var contentCode = element.html();
                    element.html(contentCode.trim()
                        .replace(/\s\s+/g, '\n')
                        .replace(/\/tb1/g, '   ')
                        .replace(/\/tb2/g, '      ')
                        .replace(/\/tb3/g, '         ')
                        .replace(/\/tb4/g, '            ')
                        .replace(/\/nl/g,'')
                        .replace(/\/lt/g, '<span><</span>')
                        .replace(/\/gt/g, '<span>></span>'));
                }
            };
        }]);
})();