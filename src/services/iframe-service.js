'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .service('IframeService', ['$http', function ($http) {
            this.getDetails = function (topic) {
                return $http.get('/pages/iframe.html');
            };
        }]);
})();