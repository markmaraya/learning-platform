(function () {
	'use strict';

	angular.module('LearningPlatformApplication', ['ngRoute', 'demo.app.templates', 'ui.bootstrap', 'ngPrism', 'ui.ace']);

	angular
        .module('LearningPlatformApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.otherwise({
					template: '<h1>404</h1>'
				});
		}]);
})();