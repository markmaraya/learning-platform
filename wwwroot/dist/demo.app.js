'use strict';

(function () {
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
        .directive('content', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    object: '='
                },
                template: '<div class="section"><h4>{{object.title}}</h4><p id="chapterContent">{{object.content | toString}}</p></div>'
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
                template: '<a href="" ng-repeat="lesson in list" ng-click="choiceFunction(lesson)">{{lesson | capitalize}}</a>'
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
        .controller('LessonController', ['$scope', '$routeParams', 'LessonDetailService', function ($scope, $routeParams, LessonDetailService) {
            var x2js = new X2JS();

            var path = $routeParams.lesson;
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
                    $scope.topicList = x2js.xml_str2json(response.data);
                    $scope.chapter = $scope.topicList.lesson.chapter[0];

                    var titleListBeginner = [];
                    var titleListIntermediate = [];
                    var titleListAdvance = [];

                    for (var key in $scope.topicList.lesson.chapter) {
                        if ($scope.topicList.lesson.chapter[key].level == 'Beginner') {
                            titleListBeginner.push($scope.topicList.lesson.chapter[key].title);
                        }
                        if ($scope.topicList.lesson.chapter[key].level == 'Intermediate') {
                            titleListIntermediate.push($scope.topicList.lesson.chapter[key].title);
                        }
                        if ($scope.topicList.lesson.chapter[key].level == 'Advance') {
                            titleListAdvance.push($scope.topicList.lesson.chapter[key].title);
                        }
                    };

                    $scope.titleListBeginner = titleListBeginner;
                    $scope.titleListIntermediate = titleListIntermediate;
                    $scope.titleListAdvance = titleListAdvance;

                    $scope.htmlCode.text = parseCode($scope.chapter.code.htmlcode);
                    $scope.scriptCode.text = parseCode($scope.chapter.code.scriptcode);
                    $scope.styleCode.text = parseCode($scope.chapter.code.stylecode);

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
                })
                .catch(function (data) {
                    $scope.titleList = "";
                    $scope.chapter = "";
                });

            $scope.choiceFunction = function (lesson) {
                var chapters = $scope.topicList.lesson.chapter;

                for (var i = 0; i < chapters.length; i++) {
                    if (chapters[i].title == lesson) {
                        $scope.chapter = chapters[i];
                        $scope.htmlCode.text = parseCode($scope.chapter.code.htmlcode);
                        $scope.scriptCode.text = parseCode($scope.chapter.code.scriptcode);
                        $scope.styleCode.text = parseCode($scope.chapter.code.stylecode);
                        document.getElementById('iframeWrapper').innerHTML = '';
                    }
                };
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
                return code.toString().trim().replace(/\s\s+/g, '\n').replace(/\/t/g, '\t');
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
//# sourceMappingURL=demo.app.js.map
