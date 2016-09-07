'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .filter('spaceless', function () {
            return function (input) {
                if (input) {
                    return input.replace(/\s+/g, '-');
                }
            }
        });
})();