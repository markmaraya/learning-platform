'use strict';

(function () {
	angular.module('LearningPlatformApplication', ['ngRoute']);

	angular
        .module('LearningPlatformApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when("/", {
					templateUrl: "/src/pages/topics.html"
				})
				.when("/main", {
					templateUrl: "/src/pages/main.html"
				})
				.otherwise({
					template: "<h1>404</h1>"
				});
		}]);
})();