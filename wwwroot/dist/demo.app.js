(function () {
	'use strict';

	angular.module('LearningPlatformApplication', [
		'ngRoute',
		'demo.app.templates',
		'ui.bootstrap',
		'ngPrism',
		'ui.ace'
	]);

	angular
		.module('LearningPlatformApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.otherwise({
					template: '<h1>404</h1>'
				});
		}]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .service('LessonDetailService', ['$http', function ($http) {
            this.getDetails = function (path) {
                return $http.get('../materials/' + path + '/' + path + '.xml');
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .service('LessonListService', ['$http', function ($http) {
            this.getDetails = function () {
                return $http.get('../materials/lessons.xml');
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .service('UtilityService', ['$filter', function ($filter) {
            this.TrimCDataForView = function (code) {
                return code.toString().trim()
                    .replace(/\s\s+/g, '\n')
                    .replace(/\/tb1/g, '   ')
                    .replace(/\/tb2/g, '      ')
                    .replace(/\/tb3/g, '         ')
                    .replace(/\/tb4/g, '            ');
            };

            this.TrimCodeObject = function (codeObjectScope, codeObject) {
                codeObjectScope.html = this.TrimCDataForView(codeObject.htmlcode);
                codeObjectScope.script = this.TrimCDataForView(codeObject.scriptcode);
                codeObjectScope.style = this.TrimCDataForView(codeObject.stylecode);
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
                this.TrimCodeObject(scope.code, scope.chapter.code);
            };

            this.CopyCodeValue = function (scope) {
                scope.htmlCodeCopy = angular.copy(scope.code.html);
                scope.scriptCodeCopy = angular.copy(scope.code.script);
                scope.styleCodeCopy = angular.copy(scope.code.style);
            };

            this.GetChapter = function (scope, lesson, chapters) {
                for (var i = 0; i < chapters.length; i++) {
                    if (chapters[i].title === lesson) {
                        scope.chapter = chapters[i];

                        this.AddCodeValue(scope);
                        this.CopyCodeValue(scope);
                    }
                }
            };

            this.showHideLesson = function (lesson, list) {
                for (var key in list) {
                    if (lesson != $filter('spaceToDash')(list[key].title)) {
                        list[key].hide = 'hide-lesson';
                    } else {
                        list[key].hide = 'show-lesson';
                    }
                }
            };

            this.webSandboxCode = function (scope) {
                scope.wscode = {
                    html: scope.code.html,
                    css: scope.code.style,
                    js: scope.code.script,
                    jsDependencies: scope.dependencyLink
                };
            };

            this.hidePagination = function (scope) {
                if (scope.totalItems <= 10) {
                    scope.hidePagination = true;
                } else {
                    scope.hidePagination = false;
                }
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .service('X2jsService', [function () {
            var x2js = new X2JS();

            this.xml_str2json = function (str) {
                return x2js.xml_str2json(str);
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('chapterContent', ['$compile', function ($compile) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    content: '='
                },
                link: function (scope, element) {
                    scope.$watch('content', function (newValue) {
                        if (newValue !== undefined) {
                            var template = $compile('<div id="chapterContent">' + scope.content + '</div>')(scope);
                            element.empty().append(template);
                        }
                    });
                }
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('contentCode', [function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    var contentCode = element.html();
                    element.html(contentCode.trim()
                        .replace(/\s\s+/g, '\n')
                        .replace(/\/tb1/g, '   ')
                        .replace(/\/tb2/g, '      ')
                        .replace(/\/tb3/g, '         ')
                        .replace(/\/tb4/g, '            ')
                        .replace(/\/nl/g,'')
                        .replace(/\/lt/g, '<span><</span>')
                        .replace(/\/gt/g, '<span>></span>'));
                }
            };
        }]);
})();
(function () {
    'use strict';

    angular.module('ngPrism', []).
        directive('prism', [function () {
            return {
                restrict: 'A',
                link: function ($scope, element) {
                    element.ready(function () {
                        Prism.highlightElement(element[0]);
                    });
                }
            };
        }]);
})();
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
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .filter('startFrom', [function () {
            return function (input, start) {
                if (input) {
                    start = +start;
                    return input.slice(start);
                }
                return [];
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .filter('spaceToDash', [function () {
            return function (input) {
                if (input) {
                    return input.toLowerCase().replace(/\s+/g, '-');
                }
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .filter('toTitleCase', [function () {
            return function (input) {
                if (input.indexOf(' ') !== -1) {
                    var inputPieces, i;

                    input = input.toLowerCase();
                    inputPieces = input.split(' ');

                    for (i = 0; i < inputPieces.length; i++) {
                        inputPieces[i] = capitalizeString(inputPieces[i]);
                    }

                    return inputPieces.toString().replace(/,/g, ' ');
                }
                else {
                    input = input.toLowerCase();
                    return capitalizeString(input);
                }

                function capitalizeString(inputString) {
                    return inputString.substring(0, 1).toUpperCase() + inputString.substring(1);
                }
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'module/module.html',
                    controller: 'ModuleController',
                    controllerAs: 'module'
                })
                .when('/module', {
                    templateUrl: 'module/module.html',
                    controller: 'ModuleController',
                    controllerAs: 'module'
                });
        }])
        .controller('ModuleController', ['LessonListService', 'X2jsService', 'UtilityService', 'filterFilter', function (LessonListService, X2jsService, UtilityService, filterFilter) {
            var vm = this;

            vm.topicList = [];
            vm.showHideClass = {};
            vm.moduleFilter = {};
            vm.totalItems = 0;

            vm.currentPage = 1;
            vm.itemsPerPage = 10;

            LessonListService.getDetails()
                .then(function (response) {
                    var lessons = X2jsService.xml_str2json(response.data).lesson.topic;

                    if (lessons.length === undefined) {
                        vm.topicList.push(lessons);
                    } else {
                        for (var key in lessons) {
                            vm.topicList.push(lessons[key]);
                        }
                    }

                    vm.totalItems = vm.topicList.length;

                    UtilityService.hidePagination(vm);
                });

            vm.selectLesson = function (lesson) {
                vm.lesson = lesson;
                vm.showHideClass.levelLinks = 'show';
                vm.showHideClass.levelBackButton = 'show';
                vm.showHideClass.moduleFilter = 'hide';
                vm.hidePagination = true;

                UtilityService.showHideLesson(lesson, vm.topicList);
            };

            vm.backToModules = function () {
                vm.lesson = '';
                vm.showHideClass = {};
                vm.hidePagination = false;

                for (var key in vm.topicList) {
                    vm.topicList[key].hide = '';
                }
            };

            vm.updateSearch = function () {
                vm.filtered = filterFilter(vm.topicList, { title: vm.moduleFilter.title });
                vm.totalItems = vm.filtered.length;

                UtilityService.hidePagination(vm);
            };
        }]);
})();
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
//# sourceMappingURL=demo.app.js.map
