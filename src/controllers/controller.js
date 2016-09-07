'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('LearningPlatformController', ['$scope', '$sce', 'TopicDetailService', function ($scope, $sce, TopicDetailService) {
            $scope.topicList = ['introduction', 'directives', 'expressions', 'modules', 'controllers', 'scopes', 'data binding',
                'services', 'dependency injection', 'filters', 'forms', 'routing', 'custom directive'];

            TopicDetailService.getDetails('introduction')
                .then(function (response) {
                    $scope.topic = response.data;
                });
            $scope.choiceFunction = function (topic) {
                TopicDetailService.getDetails(topic)
                    .then(function (response) {
                        $scope.topic = response.data;
                    });
            };

            $scope.sideNav = '';
            $scope.sideNavToggle = function (sideNav) {
                if (sideNav == '') {
                    $scope.sideNav = 'show';
                } else {
                    $scope.sideNav = '';
                }
            }

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