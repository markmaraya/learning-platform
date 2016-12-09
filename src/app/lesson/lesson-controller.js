(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/module/:lesson/:level', {
                    templateUrl: 'lesson/lesson.html',
                    controller: 'LessonController',
                    controllerAs: 'lesson'
                });
        }])
        .controller('LessonController', ['$routeParams', 'LessonDetailService', 'X2jsService', 'UtilityService', 'webSandboxService', function ($routeParams, LessonDetailService, X2jsService, UtilityService, webSandboxService) {
            var vm = this;
            var path = $routeParams.lesson;
            var level = $routeParams.level;
            var chapterList = {};
            var dependencyLink = [
                'bower_components/angular/angular.min.js',
                'bower_components/angular-route/angular-route.min.js'
            ];

            vm.code = {};
            vm.breadcrumb = {};
            vm.mycode = {};
            vm.titleList = [];

            vm.breadcrumb.lesson = path;
            vm.breadcrumb.level = level;

            vm.dependencyLink = dependencyLink;

            vm.showExampleLabel = 'Example';

            LessonDetailService.getDetails(path)
                .then(function (response) {
                    chapterList = X2jsService.xml_str2json(response.data).lesson.chapter;

                    UtilityService.GetTitleByLevel(vm, chapterList, level);
                    UtilityService.AddCodeValue(vm);
                    UtilityService.CopyCodeValue(vm);
                    UtilityService.webSandboxCode(vm);
                })
                .catch(function () {
                    vm.chapter = '';
                });

            vm.submitCode = function () {
                UtilityService.webSandboxCode(vm);

                webSandboxService.compile();
            };

            vm.resetCode = function () {
                vm.code.html = vm.htmlCodeCopy;
                vm.code.script = vm.scriptCodeCopy;
                vm.code.style = vm.styleCodeCopy;

                vm.showExampleLabel = 'Example';

                UtilityService.webSandboxCode(vm);

                webSandboxService.clear();
            };

            vm.showExample = function () {
                switch (vm.showExampleLabel) {
                    case 'Example':
                        angular.copy(vm.code, vm.mycode);

                        UtilityService.TrimCodeObject(vm.code, vm.chapter.example);

                        vm.showExampleLabel = 'My Code';

                        break;
                    case 'My Code':
                        vm.code = vm.mycode;
                        vm.mycode = {};

                        vm.showExampleLabel = 'Example';

                        break;
                }
            };

            vm.choiceFunction = function (lesson) {
                var chapters = chapterList;

                UtilityService.GetChapter(vm, lesson, chapters);

                webSandboxService.clear();
            };

            vm.updateHtmlCode = function (data) {
                vm.code.html = data;
            };

            vm.updateScriptCode = function (data) {
                vm.code.script = data;
            };

            vm.updateStyleCode = function (data) {
                vm.code.style = data;
            };
        }]);
})();