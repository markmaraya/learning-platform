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
            expect(controller.showHideClass.moduleFilter).toBe('hide');
            expect(controller.hidePagination).toBe(true);
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
            expect(controller.showHideClass).toEqual({});
            expect(controller.hidePagination).toBeFalsy();
        });
    });

    describe('when I call updateSearch', function () {
        it('should assign values', function () {
            controller.updateSearch();

            expect(controller.filtered).toBeTruthy();
        });

        it('should call hidePagination function', function () {
            spyOn(utilityService, 'hidePagination');

            controller.updateSearch();

            expect(utilityService.hidePagination).toHaveBeenCalled();
        });
    });
});