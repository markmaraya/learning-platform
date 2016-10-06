(function () {
    'use strict';

    angular
        .module('LearningPlatformApplication')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/lesson/:lesson', {
                    templateUrl: 'level/level.html',
                    controller: 'LevelController',
                    controllerAs: 'levelCont'
                });
        }])
        .controller('LevelController', ['$routeParams', function ($routeParams) {
            var vm = this;

            vm.lesson = $routeParams.lesson;
        }]);
})();