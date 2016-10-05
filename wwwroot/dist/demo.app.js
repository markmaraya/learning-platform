(function () {
	'use strict';

	angular.module('LearningPlatformApplication', ['ngRoute', 'demo.app.templates', 'ui.bootstrap']);

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

            this.CopyCodeValue = function (scope, CDataParse) {
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
                restrict: 'E',
                replace: true,
                link: function (scope, element) {
                    var contentCode = element.html();
                    element.html(contentCode.trim()
                        .replace(/\s\s+/g, '\n')
                        .replace(/\/tb/g, '   ')
                        .replace(/\/n/g,'')
                        .replace(/\/lt/g, '<span><</span>')
                        .replace(/\/gt/g, '<span>></span>'));
                }
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('content', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    object: '='
                },
                template: '<div class="section"><h4>{{object.title}}</h4><chapter-content content="object.content"></chapter-content></div>'
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('lessons', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="#lesson/{{lessons.title | spaceless}}" ng-repeat="lessons in list"><div class="lesson-div bg-primary"><i class="mdi mdi-{{lessons.icon}} mdi-48px"></i><h1>{{lessons.title}}</h1></div></a>'
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .directive('repeatLink', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="" ng-repeat="lesson in list" ng-click="lessonCont.choiceFunction(lesson)">{{lesson | capitalize}}</a>'
            };
        }]);
})();
(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .filter('capitalize', [function () {
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
        .filter('spaceless', [function () {
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
                    UtilityService.CopyCodeValue(vm, CDataParse);
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
                        UtilityService.CopyCodeValue(vm, CDataParse);

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
(function () {
    'use strict';
    
    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'main/main.html',
					controller: 'MainController',
                    controllerAs: 'mainCont'
				});
        }])
        .controller('MainController', ['LessonListService', 'X2jsService', function (LessonListService, X2jsService) {
            var vm = this;
            
            vm.topicList = [];
            
            LessonListService.getDetails()
                .then(function (response) {
                    var lessons = X2jsService.xml_str2json(response.data).lesson.topic;
                    
                    for (var key in lessons) {
                        vm.topicList.push(lessons[key]);
                    }
                });
        }]);
})();
//# sourceMappingURL=demo.app.js.map
