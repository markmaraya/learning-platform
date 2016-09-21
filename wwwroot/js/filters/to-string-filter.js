'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .filter('toString', [function () {
            return function (input) {
                if (input) {
                    return input.toString();
                }
            }
        }]);
})();