(function () {
    'use strict';

    WebSandbox.$inject = ['$window', '$timeout', 'webSandboxService'];

    angular
        .module('LearningPlatformApplication')
        .directive('webSandbox', WebSandbox)
        .service('webSandboxService', WebSandboxService);

    function WebSandbox($window, $timeout, webSandboxService) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="web-sandbox"></div>',
            scope: {
                wsId: '@',
                code: '='
            },
            compile: WebSandboxCompileFunction($window, $timeout, webSandboxService)
        };
    }

    function WebSandboxCompileFunction($window, $timeout, webSandboxService) {
        return function () {
            return function (scope, element) {
                webSandboxService.onCompile(function () {
                    var iframe, iframeWindow;
                    iframe = createNewIframe();
                    element.empty();
                    element.append(iframe);

                    iframeWindow = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;

                    $timeout(function () {
                        writeToIframeWindow(iframeWindow);
                    });
                });

                webSandboxService.onClear(function () {
                    element.empty();
                });

                function createNewIframe() {
                    var iframe = $window.document.createElement('iframe');
                    iframe.setAttribute('id', scope.wsId);
                    iframe.setAttribute('class', 'web-sandbox-iframe');
                    iframe.setAttribute('frameborder', '0');
                    return iframe;
                }

                function writeToIframeWindow(iframeWindow) {
                    iframeWindow.document.open();
                    iframeWindow.document.write(scope.code.html);
                    iframeWindow.document.write('<style>' + scope.code.css + '<\/style>');

                    angular.forEach(scope.code.jsDependencies, function (value) {
                        iframeWindow.document.write('<script type="text/javascript" src="' + value + '"><\/script>');
                    });

                    iframeWindow.document.write('<script type="text/javascript">' + scope.code.js + '<\/script>');
                    iframeWindow.document.close();
                }
            };
        };
    }

    function WebSandboxService() {
        var svc = this;

        var onCompileHandler;
        var onClearHandler;

        svc.compile = compile;
        svc.clear = clear;
        svc.onCompile = onCompile;
        svc.onClear = onClear;

        function compile() {
            if (onCompileHandler) {
                onCompileHandler();
            }
        }

        function onCompile(handler) {
            onCompileHandler = handler;
        }

        function clear() {
            if (onClearHandler) {
                onClearHandler();
            }
        }

        function onClear(handler) {
            onClearHandler = handler;
        }
    }
})();