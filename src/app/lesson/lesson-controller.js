(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/lesson/:lesson/:level', {
                    templateUrl: 'lesson/lesson.html',
                    controller: 'LessonController',
                    controllerAs: 'lesson'
                });
        }])
        .controller('LessonController', ['$routeParams', 'LessonDetailService', 'X2jsService', 'UtilityService', function ($routeParams, LessonDetailService, X2jsService, UtilityService) {
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
            vm.titleList = [];

            vm.breadcrumb.lesson = path;
            vm.breadcrumb.level = level;

            LessonDetailService.getDetails(path)
                .then(function (response) {
                    chapterList = X2jsService.xml_str2json(response.data).lesson.chapter;

                    UtilityService.GetTitleByLevel(vm, chapterList, level);
                    UtilityService.AddCodeValue(vm);
                    UtilityService.CopyCodeValue(vm);
                })
                .catch(function () {
                    vm.chapter = '';
                });

            vm.submitCode = function () {
                UtilityService.WriteCodeToIframe(vm, dependencyLink);
            };

            vm.resetCode = function () {
                vm.code.html = vm.htmlCodeCopy;
                vm.code.script = vm.scriptCodeCopy;
                vm.code.style = vm.styleCodeCopy;

                document.getElementById('iframeWrapper').innerHTML = '';
            };

            vm.showExample = function () {
                vm.code.html = UtilityService.TrimCDataForView(vm.chapter.example.htmlcode);
                vm.code.script = UtilityService.TrimCDataForView(vm.chapter.example.scriptcode);
                vm.code.style = UtilityService.TrimCDataForView(vm.chapter.example.stylecode);

                vm.submitCode();
            };

            vm.choiceFunction = function (lesson) {
                var chapters = chapterList;

                UtilityService.GetChapter(vm, lesson, chapters);
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