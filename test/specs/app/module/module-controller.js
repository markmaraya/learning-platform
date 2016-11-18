'use strict';

describe('ModuleController', function () {

    var scope, controller;
    var utilityService;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _UtilityService_) {
        scope = _$rootScope_.$new();
        controller = _$controller_('ModuleController', { $scope: scope });
        utilityService = _UtilityService_;
    }));

    describe('when I call selectLesson', function () {
        it('should assign values', function () {
            var mockLesson = 'angularjs';

            controller.selectLesson(mockLesson);

            expect(controller.lesson).toBe(mockLesson);
            expect(controller.showHideClass.levelLinks).toBe('show');
            expect(controller.showHideClass.levelBackButton).toBe('show');
        });

        it('should call showHideLesson function', function () {
            spyOn(utilityService, 'showHideLesson');

            controller.selectLesson();

            expect(utilityService.showHideLesson).toHaveBeenCalled();
        });
    });

    describe('when I call backToModules', function () {
        it('should remove values', function () {
            controller.backToModules();

            expect(controller.lesson).toBeFalsy();
            expect(controller.showHideClass.levelLinks).toBeFalsy();
            expect(controller.showHideClass.levelBackButton).toBeFalsy();
        });
    });
});