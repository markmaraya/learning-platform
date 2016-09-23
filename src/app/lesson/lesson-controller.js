'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('LessonController', ['$scope', '$routeParams', 'LessonDetailService', function ($scope, $routeParams, LessonDetailService) {
            var x2js = new X2JS();

            var path = $routeParams.lesson;
            var dependencyLink = 'bower_components/angular/angular.min.js';

            $scope.htmlCode = {};

            $scope.breadcrumbLesson = path;

            LessonDetailService.getDetails(path)
                .then(function (response) {
                    $scope.topicList = x2js.xml_str2json(response.data);
                    $scope.chapter = $scope.topicList.lesson.chapter[0];

                    var titleList = [];

                    for (var key in $scope.topicList.lesson.chapter) {
                        titleList.push($scope.topicList.lesson.chapter[key].title);
                    };

                    $scope.titleList = titleList;

                    $scope.htmlCode.text = $scope.chapter.code.htmlcode.toString().trim().replace(/\s\s+/g, '\n\n').replace(/\/t/g, '\t');
                    $scope.scriptCode = $scope.chapter.code.scriptcode.toString().trim().replace(/\s\s+/g, '\n\n').replace(/\/t/g, '\t');

                    $scope.submitCode = function () {
                        var text = $scope.htmlCode.text;
                        var scriptText = $scope.scriptCode;
                        var styleText = $scope.styleCode;

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
                        ifrw.document.write('<script type="text/javascript" src="' + dependencyLink + '"><\/scr' + 'ipt>');
                        ifrw.document.write('<script type="text/javascript">' + scriptText + '<\/scr' + 'ipt>');
                        ifrw.document.close();

                        // ifrw.document.documentElement.setAttribute("ng-app", "myApp");
                    };
                })
                .catch(function (data) {
                    $scope.titleList = "";
                    $scope.chapter = "";
                });

            $scope.choiceFunction = function (id) {
                $scope.chapter = $scope.topicList.lesson.chapter[id];
                $scope.htmlCode.text = $scope.chapter.code.htmlcode.toString().trim().replace(/\s\s+/g, '\n\n').replace(/\/t/g, '\t');
                $scope.scriptCode = $scope.chapter.code.scriptcode.toString().trim().replace(/\s\s+/g, '\n\n').replace(/\/t/g, '\t');
                document.getElementById('iframeWrapper').innerHTML = '';
            };

            $scope.updateHtmlCode = function (data) {
                $scope.htmlCode.text = data;
            };

            $scope.updateScriptCode = function (data) {
                $scope.scriptCode = data;
            };

            $scope.updateStyleCode = function (data) {
                $scope.styleCode = data;
            };
        }]);
})();