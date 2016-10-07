(function () {
    'use strict';
    
    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'module/module.html',
					controller: 'ModuleController',
                    controllerAs: 'module'
				});
        }])
        .controller('ModuleController', ['LessonListService', 'X2jsService', function (LessonListService, X2jsService) {
            var vm = this;
            
            vm.topicList = [];
            
            LessonListService.getDetails()
                .then(function (response) {
                    var lessons = X2jsService.xml_str2json(response.data).lesson.topic;
                    
                    for (var key in lessons) {
                        vm.topicList.push(lessons[key]);
                    }
                });
        }]);
})();