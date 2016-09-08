'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('LearningPlatformController', ['$scope', 'TopicDetailService', function ($scope, TopicDetailService) {
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
            $scope.sideNavIcon = 'glyphicon-menu-hamburger';
            $scope.sideNavToggle = function (sideNav) {
                if (sideNav == '') {
                    $scope.sideNav = 'show';
                    $scope.sideNavIcon = 'glyphicon-remove';
                } else {
                    $scope.sideNav = '';
                    $scope.sideNavIcon = 'glyphicon-menu-hamburger';
                }
            };

        }]);
})();