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
                })
                .when('/module', {
                    templateUrl: 'module/module.html',
                    controller: 'ModuleController',
                    controllerAs: 'module'
                });
        }])
        .controller('ModuleController', ['LessonListService', 'X2jsService', 'UtilityService', function (LessonListService, X2jsService, UtilityService) {
            var vm = this;

            vm.topicList = [];
            vm.showHideClass = {};

            LessonListService.getDetails()
                .then(function (response) {
                    var lessons = X2jsService.xml_str2json(response.data).lesson.topic;

                    if (lessons.length === undefined) {
                        vm.topicList.push(lessons);
                    } else {
                        for (var key in lessons) {
                            vm.topicList.push(lessons[key]);
                        }
                    }
                });

            vm.selectLesson = function (lesson) {
                vm.lesson = lesson;
                vm.showHideClass.levelLinks = 'show';
                vm.showHideClass.levelBackButton = 'show';

                UtilityService.showHideLesson(lesson, vm.topicList);
            };

            vm.backToModules = function () {
                vm.lesson = '';
                vm.showHideClass.levelLinks = '';
                vm.showHideClass.levelBackButton = '';

                for (var key in vm.topicList) {
                    vm.topicList[key].hide = '';
                }
            };
        }]);
})();