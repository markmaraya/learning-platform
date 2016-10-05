(function () {
	'use strict';

	angular.module('LearningPlatformApplication', ['ngRoute', 'demo.app.templates', 'ui.bootstrap']);

	angular
        .module('LearningPlatformApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'main/main.html',
					controller: 'MainController'
				})
				.when('/lesson/:lesson', {
					templateUrl: 'lesson/lesson.html',
					controller: 'LessonController'
				})
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
                template: '<a href="" ng-repeat="lesson in list" ng-click="choiceFunction(lesson)">{{lesson | capitalize}}</a>'
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
(function () {
    'use strict';
    
    angular
        .module('LearningPlatformApplication')
        .controller('MainController', ['$scope', 'LessonListService', 'X2jsService', function ($scope, LessonListService, X2jsService) {
            $scope.topicList = [];
            
            LessonListService.getDetails()
                .then(function (response) {
                    $scope.lessons = X2jsService.xml_str2json(response.data).lesson.topic;
                    
                    for (var key in $scope.lessons) {
                        $scope.topicList.push($scope.lessons[key]);
                    }
                });
        }]);
})();
//# sourceMappingURL=demo.app.js.map
