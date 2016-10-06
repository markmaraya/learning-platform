(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .filter('spaceToDash', [function () {
            return function (input) {
                if (input) {
                    return input.toLowerCase().replace(/\s+/g, '-');
                }
            };
        }]);
})();