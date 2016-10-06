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

            vm.htmlCode = {};
            vm.scriptCode = {};
            vm.styleCode = {};
            vm.titleList = [];

            vm.breadcrumbLesson = path;
            vm.breadcrumbLevel = level;

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
                vm.htmlCode.text = vm.htmlCodeCopy;
                vm.scriptCode.text = vm.scriptCodeCopy;
                vm.styleCode.text = vm.styleCodeCopy;

                document.getElementById('iframeWrapper').innerHTML = '';
            };

            vm.showExample = function () {
                vm.htmlCode.text = UtilityService.TrimCDataForView(vm.chapter.example.htmlcode);
                vm.scriptCode.text = UtilityService.TrimCDataForView(vm.chapter.example.scriptcode);
                vm.styleCode.text = UtilityService.TrimCDataForView(vm.chapter.example.stylecode);

                vm.submitCode();
            };

            vm.choiceFunction = function (lesson) {
                var chapters = chapterList;

                UtilityService.GetChapter(vm, lesson, chapters);
            };

            vm.updateHtmlCode = function (data) {
                vm.htmlCode.text = data;
            };

            vm.updateScriptCode = function (data) {
                vm.scriptCode.text = data;
            };

            vm.updateStyleCode = function (data) {
                vm.styleCode.text = data;
            };
        }]);
})();