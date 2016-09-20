'use strict';

(function () {
	angular.module('LearningPlatformApplication', ['ngRoute']);

	angular
        .module('LearningPlatformApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when("/", {
					templateUrl: "/src/app/main/main.html",
					controller: "MainController"
				})
				.when("/lesson/:lesson", {
					templateUrl: "/src/app/lesson/lesson.html",
					controller: "LessonController"
				})
				.otherwise({
					template: "<h1>404</h1>"
				});
		}]);
})();