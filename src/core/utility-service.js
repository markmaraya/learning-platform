(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .service('UtilityService', [function () {
            this.TrimCDataForView = function (code) {
                return code.toString().trim().replace(/\s\s+/g, '\n').replace(/\/tb/g, '   ');
            };

            this.GetTitleByLevel = function (scope, chapterList, level) {
                for (var key in chapterList) {
                    if (chapterList[key].level.toLowerCase() === level) {
                        scope.titleList.push(chapterList[key].title);
                    }
                    if (chapterList[key].title === scope.titleList[0]) {
                        scope.chapter = chapterList[key];
                    }
                }
            };

            this.AddCodeValue = function (scope) {
                scope.htmlCode.text = this.TrimCDataForView(scope.chapter.code.htmlcode);
                scope.scriptCode.text = this.TrimCDataForView(scope.chapter.code.scriptcode);
                scope.styleCode.text = this.TrimCDataForView(scope.chapter.code.stylecode);
            };

            this.CopyCodeValue = function (scope) {
                scope.htmlCodeCopy = angular.copy(scope.htmlCode.text);
                scope.scriptCodeCopy = angular.copy(scope.scriptCode.text);
                scope.styleCodeCopy = angular.copy(scope.styleCode.text);
            };

            this.GetChapter = function (scope, lesson, chapters) {
                for (var i = 0; i < chapters.length; i++) {
                    if (chapters[i].title == lesson) {
                        scope.chapter = chapters[i];

                        this.AddCodeValue(scope);
                        this.CopyCodeValue(scope);

                        document.getElementById('iframeWrapper').innerHTML = '';
                    }
                }
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