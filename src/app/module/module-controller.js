(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/module', {
                    templateUrl: 'module/module.html',
                    controller: 'ModuleController',
                    controllerAs: 'module'
                });
        }])
        .controller('ModuleController', ['LessonListService', 'X2jsService', '$filter', function (LessonListService, X2jsService, $filter) {
            var vm = this;

            vm.topicList = [];
            vm.showHideClass = {};

            LessonListService.getDetails()
                .then(function (response) {
                    var lessons = X2jsService.xml_str2json(response.data).lesson.topic;

                    for (var key in lessons) {
                        vm.topicList.push(lessons[key]);
                    }
                });

            vm.selectLesson = function (lesson) {
                vm.lesson = lesson;
                vm.showHideClass.levelLinks = 'show';
                vm.showHideClass.levelBackButton = 'show';

                for (var key in vm.topicList) {
                    if (lesson != $filter('spaceToDash')(vm.topicList[key].title)) {
                        vm.topicList[key].hide = 'hide-lesson';
                    } else {
                        vm.topicList[key].hide = 'show-lesson';
                    }
                }
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