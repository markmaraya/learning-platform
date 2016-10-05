(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .controller('LessonController', ['$scope', '$routeParams', 'LessonDetailService', 'X2jsService', function ($scope, $routeParams, LessonDetailService, X2jsService) {
            var path = $routeParams.lesson;
            var chapterList = {};
            var dependencyLink = [
                'bower_components/angular/angular.min.js',
                'bower_components/angular-route/angular-route.min.js'
            ];

            $scope.htmlCode = {};
            $scope.scriptCode = {};
            $scope.styleCode = {};

            $scope.breadcrumbLesson = path;

            LessonDetailService.getDetails(path)
                .then(function (response) {
                    chapterList = X2jsService.xml_str2json(response.data).lesson.chapter;
                    $scope.chapter = chapterList[0];

                    $scope.titleListBeginner = [];
                    $scope.titleListIntermediate = [];
                    $scope.titleListAdvance = [];

                    for (var key in chapterList) {
                        switch (chapterList[key].level) {
                            case 'Beginner':
                                $scope.titleListBeginner.push(chapterList[key].title);
                                break;
                            case 'Intermediate':
                                $scope.titleListIntermediate.push(chapterList[key].title);
                                break;
                            case 'Advance':
                                $scope.titleListAdvance.push(chapterList[key].title);
                                break;
                        }
                    }

                    $scope.htmlCode.text = parseCode($scope.chapter.code.htmlcode);
                    $scope.scriptCode.text = parseCode($scope.chapter.code.scriptcode);
                    $scope.styleCode.text = parseCode($scope.chapter.code.stylecode);

                    $scope.htmlCodeCopy = angular.copy($scope.htmlCode.text);
                    $scope.scriptCodeCopy = angular.copy($scope.scriptCode.text);
                    $scope.styleCodeCopy = angular.copy($scope.styleCode.text);
                })
                .catch(function () {
                    $scope.chapter = '';
                });

            $scope.submitCode = function () {
                var text = $scope.htmlCode.text;
                var scriptText = $scope.scriptCode.text;
                var styleText = $scope.styleCode.text;

                var ifr = document.createElement('iframe');

                ifr.setAttribute('name', 'frame1');
                ifr.setAttribute('frameborder', '0');
                ifr.setAttribute('id', 'iframeResult');
                document.getElementById('iframeWrapper').innerHTML = '';
                document.getElementById('iframeWrapper').appendChild(ifr);

                var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;

                ifrw.document.open();
                ifrw.document.write(text);
                ifrw.document.write('<style>' + styleText + '<\/style>');

                angular.forEach(dependencyLink, function (value) {
                    ifrw.document.write('<script type="text/javascript" src="' + value + '"><\/scr' + 'ipt>');
                });

                ifrw.document.write('<script type="text/javascript">' + scriptText + '<\/scr' + 'ipt>');
                ifrw.document.close();
            };

            $scope.resetCode = function () {
                $scope.htmlCode.text = $scope.htmlCodeCopy;
                $scope.scriptCode.text = $scope.scriptCodeCopy;
                $scope.styleCode.text = $scope.styleCodeCopy;
                document.getElementById('iframeWrapper').innerHTML = '';
            };

            $scope.showExample = function () {
                $scope.htmlCode.text = parseCode($scope.chapter.example.htmlcode);
                $scope.scriptCode.text = parseCode($scope.chapter.example.scriptcode);
                $scope.styleCode.text = parseCode($scope.chapter.example.stylecode);

                $scope.submitCode();
            };

            $scope.choiceFunction = function (lesson) {
                var chapters = chapterList;

                for (var i = 0; i < chapters.length; i++) {
                    if (chapters[i].title == lesson) {
                        $scope.chapter = chapters[i];

                        $scope.htmlCode.text = parseCode($scope.chapter.code.htmlcode);
                        $scope.scriptCode.text = parseCode($scope.chapter.code.scriptcode);
                        $scope.styleCode.text = parseCode($scope.chapter.code.stylecode);

                        $scope.htmlCodeCopy = angular.copy($scope.htmlCode.text);
                        $scope.scriptCodeCopy = angular.copy($scope.scriptCode.text);
                        $scope.styleCodeCopy = angular.copy($scope.styleCode.text);

                        document.getElementById('iframeWrapper').innerHTML = '';
                    }
                }
            };

            $scope.updateHtmlCode = function (data) {
                $scope.htmlCode.text = data;
            };

            $scope.updateScriptCode = function (data) {
                $scope.scriptCode.text = data;
            };

            $scope.updateStyleCode = function (data) {
                $scope.styleCode.text = data;
            };

            function parseCode(code) {
                return code.toString().trim().replace(/\s\s+/g, '\n').replace(/\/tb/g, '   ');
            }
        }]);
})();