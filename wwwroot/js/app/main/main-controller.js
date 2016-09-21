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