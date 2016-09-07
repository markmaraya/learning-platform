'use strict';

(function () {
	angular.module('AngularTutorialApplication', []);
})();
'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .directive('repeatLink', function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    list: '='
                },
                template: '<a href="" ng-repeat="topics in list" ng-click="choiceFunction(topics | spaceless)">{{topics | capitalize}}</a>'
            };
        });
})();
'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .filter('capitalize', function () {
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
        });
})();
'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .filter('spaceless', function () {
            return function (input) {
                if (input) {
                    return input.replace(/\s+/g, '-');
                }
            }
        });
})();
'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .service('TopicDetailService', ['$http', function ($http) {
            this.getDetails = function (topic) {
                return $http.get('/materials/' + topic + '.txt');
            };
        }]);
})();
'use strict';

(function () {
    angular
        .module('AngularTutorialApplication')
        .controller('AngularTutorialController', ['$scope', '$sce', 'TopicDetailService', function ($scope, $sce, TopicDetailService) {
            $scope.topicList = ['introduction', 'directives', 'expressions', 'modules', 'controllers', 'scopes', 'data binding',
                'services', 'dependency injection', 'filters', 'forms', 'routing', 'custom directive'];

            $scope.choiceFunction = function (topic) {
                TopicDetailService.getDetails(topic)
                    .then(function (response) {
                        $scope.topic = response.data;
                    });
            };

            $scope.runCode = function () {
                $scope.codeOutput = $sce.trustAsHtml($scope.codeInput);
            };
            $scope.x = "xxxx";
            $scope.change = function () {
                eval("console.log('helloworld')");

                var iFrame = document.getElementById('iframe');
                var iFrameBody;
                if (iFrame.contentDocument) {
                    iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
                }
                else if (iFrame.contentWindow) {
                    iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
                }
                iFrameBody.innerHTML = document.getElementById('src').value;
            }
        }]);
})();