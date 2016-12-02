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
        .controller('ModuleController', ['LessonListService', 'X2jsService', 'UtilityService', 'filterFilter', function (LessonListService, X2jsService, UtilityService, filterFilter) {
            var vm = this;

            vm.topicList = [];
            vm.showHideClass = {};
            vm.moduleFilter = {};
            vm.totalItems = 0;

            vm.currentPage = 1;
            vm.itemsPerPage = 10;

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

                    vm.totalItems = vm.topicList.length;

                    UtilityService.hidePagination(vm);
                });

            vm.selectLesson = function (lesson) {
                vm.lesson = lesson;
                vm.showHideClass.levelLinks = 'show';
                vm.showHideClass.levelBackButton = 'show';
                vm.showHideClass.moduleFilter = 'hide';
                vm.hidePagination = true;

                UtilityService.showHideLesson(lesson, vm.topicList);
            };

            vm.backToModules = function () {
                vm.lesson = '';
                vm.showHideClass = {};
                vm.hidePagination = false;

                for (var key in vm.topicList) {
                    vm.topicList[key].hide = '';
                }
            };

            vm.updateSearch = function () {
                vm.filtered = filterFilter(vm.topicList, { title: vm.moduleFilter.title });
                vm.totalItems = vm.filtered.length;

                UtilityService.hidePagination(vm);
            };
        }]);
})();