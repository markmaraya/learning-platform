(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .filter('spaceless', [function () {
            return function (input) {
                if (input) {
                    return input.toLowerCase().replace(/\s+/g, '-');
                }
            };
        }]);
})();