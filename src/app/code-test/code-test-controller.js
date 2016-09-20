'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('CodeTestController', ['$scope', function ($scope) {
            $scope.htmlCode = '<div ng-controller="myController">\n\t<h1 ng-bind="x"></h1>\n</div>';
            $scope.scriptCode = 'angular.module("myApp", []);\nangular.module("myApp")\n\t.controller("myController", ["$scope", function ($scope) {\n\t\t$scope.x = "This is a String";\n\t}]);';

            $scope.updateHtmlCode = function (data) {
                $scope.htmlCode = data;
            };

            $scope.updateScriptCode = function (data) {
                $scope.scriptCode = data;
            };

            var dependencyLink = 'bower_components/angular/angular.min.js';

            $scope.submitCode = function () {
                var text = $scope.htmlCode;
                var scriptText = $scope.scriptCode;

                var ifr = document.createElement('iframe');

                ifr.setAttribute('name', 'frame1');
                ifr.setAttribute('frameborder', '0');
                ifr.setAttribute('id', 'iframeResult');
                document.getElementById('iframeWrapper').innerHTML = '';
                document.getElementById('iframeWrapper').appendChild(ifr);

                var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;

                ifrw.document.open();
                ifrw.document.write(text);
                ifrw.document.write('<script type="text/javascript" src="' + dependencyLink + '"><\/scr' + 'ipt>');
                ifrw.document.write('<script type="text/javascript">' + scriptText + '<\/scr' + 'ipt>');
                ifrw.document.close();

                ifrw.document.documentElement.setAttribute("ng-app", "myApp");
            };
        }]);

    // function submitTryit() {
    //     var text = document.getElementById('textareaHtmlCode').value;
    //     var dependencyLink = '../bower_components/angular/angular.min.js';
    //     var scriptText = document.getElementById('textareaScriptCode').value;
    //     var ifr = document.createElement('iframe');

    //     ifr.setAttribute('name', 'frame1');
    //     ifr.setAttribute('frameborder', '0');
    //     ifr.setAttribute('id', 'iframeResult');
    //     document.getElementById('iframewrapper').innerHTML = '';
    //     document.getElementById('iframewrapper').appendChild(ifr);

    //     var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;

    //     ifrw.document.open();
    //     ifrw.document.write(text);
    //     ifrw.document.write('<script type="text/javascript" src="' + dependencyLink + '"><\/scr' + 'ipt>');
    //     ifrw.document.write('<script type="text/javascript">' + scriptText + '<\/scr' + 'ipt>');
    //     ifrw.document.close();

    //     ifrw.document.documentElement.setAttribute("ng-app", "myApp");
    // }
})();