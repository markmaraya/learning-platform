(function () {
	'use strict';

	angular.module('LearningPlatformApplication', ['ngRoute', 'demo.app.templates', 'ui.bootstrap']);

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
				.otherwise({
					template: '<h1>404</h1>'
				});
		}]);
})();