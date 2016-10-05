(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/lesson/:lesson', {
                    templateUrl: 'lesson/lesson.html',
                    controller: 'LessonController',
                    controllerAs: 'lessonCont'
                });
        }])
        .controller('LessonController', ['$routeParams', 'LessonDetailService', 'X2jsService', 'UtilityService', function ($routeParams, LessonDetailService, X2jsService, UtilityService) {
            var vm = this;
            var path = $routeParams.lesson;
            var CDataParse = UtilityService.CDataToStringTrimReplace;
            var chapterList = {};
            var dependencyLink = [
                'bower_components/angular/angular.min.js',
                'bower_components/angular-route/angular-route.min.js'
            ];

            vm.htmlCode = {};
            vm.scriptCode = {};
            vm.styleCode = {};
            vm.titleListBeginner = [];
            vm.titleListIntermediate = [];
            vm.titleListAdvance = [];

            vm.breadcrumbLesson = path;

            LessonDetailService.getDetails(path)
                .then(function (response) {
                    chapterList = X2jsService.xml_str2json(response.data).lesson.chapter;
                    vm.chapter = chapterList[0];

                    UtilityService.GroupTitleByLevel(vm, chapterList);
                    UtilityService.AddCodeValue(vm, CDataParse);
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
                vm.htmlCode.text = CDataParse(vm.chapter.example.htmlcode);
                vm.scriptCode.text = CDataParse(vm.chapter.example.scriptcode);
                vm.styleCode.text = CDataParse(vm.chapter.example.stylecode);

                vm.submitCode();
            };

            vm.choiceFunction = function (lesson) {
                var chapters = chapterList;

                for (var i = 0; i < chapters.length; i++) {
                    if (chapters[i].title == lesson) {
                        vm.chapter = chapters[i];

                        UtilityService.AddCodeValue(vm, CDataParse);
                        UtilityService.CopyCodeValue(vm);

                        document.getElementById('iframeWrapper').innerHTML = '';
                    }
                }
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