(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .service('UtilityService', [function () {
            this.CDataToStringTrimReplace = function (code) {
                return code.toString().trim().replace(/\s\s+/g, '\n').replace(/\/tb/g, '   ');
            };

            this.GroupTitleByLevel = function (scope, chapterList) {
                for (var key in chapterList) {
                    switch (chapterList[key].level) {
                        case 'Beginner':
                            scope.titleListBeginner.push(chapterList[key].title);
                            break;
                        case 'Intermediate':
                            scope.titleListIntermediate.push(chapterList[key].title);
                            break;
                        case 'Advance':
                            scope.titleListAdvance.push(chapterList[key].title);
                            break;
                    }
                }
            };

            this.AddCodeValue = function (scope, CDataParse) {
                scope.htmlCode.text = CDataParse(scope.chapter.code.htmlcode);
                scope.scriptCode.text = CDataParse(scope.chapter.code.scriptcode);
                scope.styleCode.text = CDataParse(scope.chapter.code.stylecode);
            };

            this.CopyCodeValue = function (scope) {
                scope.htmlCodeCopy = angular.copy(scope.htmlCode.text);
                scope.scriptCodeCopy = angular.copy(scope.scriptCode.text);
                scope.styleCodeCopy = angular.copy(scope.styleCode.text);
            };

            this.WriteCodeToIframe = function (scope, dependencyLink) {
                var text = scope.htmlCode.text;
                var scriptText = scope.scriptCode.text;
                var styleText = scope.styleCode.text;

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
        }]);
})();