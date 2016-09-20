'use strict';

(function () {
	angular.module('LearningPlatformApplication', ['ngRoute', 'templates', 'ui.bootstrap']);

	angular
        .module('LearningPlatformApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'main/main.html',
					controller: 'MainController'
				})
				.when('/lesson/:lesson', {
					templateUrl: 'lesson/lesson.html',
					controller: 'LessonController'
				})
				.when('/code-test', {
					templateUrl: 'code-test/code-test.html',
					controller: 'CodeTestController'
				})
				.otherwise({
					template: '<h1>404</h1>'
				});
		}]);
})();