'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .service('LessonListService', ['$http', function ($http) {
            this.getDetails = function () {
                return $http.get('../materials/lessons.xml');
            };
        }]);
})();