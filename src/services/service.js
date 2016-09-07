'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .service('TopicDetailService', ['$http', function ($http) {
            this.getDetails = function (topic) {
                return $http.get('/materials/' + topic + '.txt');
            };
        }]);
})();