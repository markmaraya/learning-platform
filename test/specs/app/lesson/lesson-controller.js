'use strict';

describe('LessonController', function () {

    var $controller, $scope;
    var controller;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        controller = $controller('LessonController', { $scope: $scope });
    }));

    describe('true', function () {
        it('does a thing', function () {
            expect(true).toBe(true);
        });
    });
});