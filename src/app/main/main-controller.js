(function () {
    'use strict';
    
    angular
        .module('LearningPlatformApplication')
        .controller('MainController', ['$scope', 'LessonListService', 'X2jsService', function ($scope, LessonListService, X2jsService) {
            $scope.lessonList = [];
            
            LessonListService.getDetails()
                .then(function (response) {
                    $scope.lessons = X2jsService.xml_str2json(response.data).lesson.topic;
                    
                    for (var key in $scope.lessons) {
                        $scope.lessonList.push($scope.lessons[key]);
                    }
                });
        }]);
})();