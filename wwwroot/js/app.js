'use strict';

(function () {
	angular.module('LearningPlatformApplication', ['ngRoute', 'templates', 'ui.bootstrap']);

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
				.when('/code-test', {
					templateUrl: 'code-test/code-test.html',
					controller: 'CodeTestController'
				})
				.otherwise({
					template: '<h1>404</h1>'
				});
		}]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .directive('content', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    object: '='
                },
                template: '<div class="section"><h4>{{object.title}}</h4><p>{{object.content}}</p><br /><h4 ng-show="object.sample">Sample</h4><p id="contentSample">{{object.sample | toString}}</p></div>'
            };
        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .directive('lessons', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="#lesson/{{lessons | spaceless}}" ng-repeat="lessons in list"><div class="lesson-div bg-primary"><img alt="Sample Image"><label>{{lessons}}</label></div></a>'
            };
        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .directive('repeatLink', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="" ng-repeat="lesson in list" ng-click="choiceFunction($index)">{{lesson | capitalize}}</a>'
            };
        }]);
})();
'use strict';

(function () {
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
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .filter('spaceless', [function () {
            return function (input) {
                if (input) {
                    return input.toLowerCase().replace(/\s+/g, '-');
                }
            }
        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .filter('toString', [function () {
            return function (input) {
                if (input) {
                    return input.toString();
                }
            }
        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .service('LessonListService', ['$http', function ($http) {
            this.getDetails = function () {
                return $http.get('../materials/lessons.xml');
            };
        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .service('LessonDetailService', ['$http', function ($http) {
            this.getDetails = function (path) {
                return $http.get('../materials/' + path + '/' + path + '.xml');
            };
        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('MainController', ['$scope', 'LessonListService', function ($scope, LessonListService) {
            var x2js = new X2JS();

            LessonListService.getDetails()
                .then(function (response) {
                    $scope.lessons = x2js.xml_str2json(response.data);

                    var lessonList = [];

                    for (var key in $scope.lessons.lesson.title) {
                        lessonList.push($scope.lessons.lesson.title[key]);
                    };

                    $scope.lessonList = lessonList;
                });

        }]);
})();
'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('LessonController', ['$scope', '$routeParams', 'LessonDetailService', function ($scope, $routeParams, LessonDetailService) {
            var x2js = new X2JS();

            var path = $routeParams.lesson;

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
                })
                .catch(function (data) {
                    $scope.titleList = "";
                    $scope.chapter = "";
                });

            $scope.choiceFunction = function (id) {
                $scope.chapter = $scope.topicList.lesson.chapter[id];
            };

        }]);
})();
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

            $scope.updateStyleCode = function (data) {
                $scope.styleCode = data;
            };

            var dependencyLink = 'bower_components/angular/angular.min.js';

            $scope.submitCode = function () {
                var text = $scope.htmlCode;
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

                ifrw.document.documentElement.setAttribute("ng-app", "myApp");
            };
        }]);
})();