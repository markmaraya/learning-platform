'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .service('LessonDetailService', ['$http', function ($http) {
            this.getDetails = function (path) {
                return $http.get('/materials/' + path + '/' + path + '.xml');
            };
        }]);
})();