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