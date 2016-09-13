'use strict';

(function () {
    angular
        .module('LearningPlatformApplication')
        .controller('LearningPlatformController', ['$scope', 'LessonDetailService', 'LessonListService', function ($scope, LessonDetailService, LessonListService) {
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

            $scope.getPath = function (path) {
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
            };

            $scope.choiceFunction = function (id) {
                $scope.chapter = $scope.topicList.lesson.chapter[id];
            };

        }]);
})();