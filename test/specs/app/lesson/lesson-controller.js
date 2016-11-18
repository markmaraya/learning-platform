'use strict';

describe('LessonController', function () {

    var scope, controller;
    var utilityService, webSandboxService;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _UtilityService_, _webSandboxService_) {
        scope = _$rootScope_.$new();
        controller = _$controller_('LessonController', { $scope: scope });
        utilityService = _UtilityService_;
        webSandboxService = _webSandboxService_;
    }));

    describe('when I call submitCode', function () {
        it('should call webSandboxCode function', function () {
            spyOn(utilityService, 'webSandboxCode');

            controller.submitCode();

            expect(utilityService.webSandboxCode).toHaveBeenCalled();
        });

        it('should call compile function', function () {
            spyOn(webSandboxService, 'compile');

            controller.submitCode();

            expect(webSandboxService.compile).toHaveBeenCalled();
        });
    });

    describe('when I call resetCode', function () {
        it('should assign value to code scope', function () {
            controller.htmlCodeCopy = '<h1>Hello World</h1>';
            var mockHtmlCodeCopy = controller.htmlCodeCopy;

            controller.resetCode();

            expect(controller.code.html).toBe(mockHtmlCodeCopy);
        });

        it('should call webSandboxCode function', function () {
            spyOn(utilityService, 'webSandboxCode');

            controller.resetCode();

            expect(utilityService.webSandboxCode).toHaveBeenCalled();
        });

        it('should call clear function', function () {
            spyOn(webSandboxService, 'clear');

            controller.resetCode();

            expect(webSandboxService.clear).toHaveBeenCalled();
        });
    });

    describe('when I call choiceFunction', function () {
        it('should call GetChapter function', function () {
            spyOn(utilityService, 'GetChapter');

            controller.choiceFunction();

            expect(utilityService.GetChapter).toHaveBeenCalled();
        });

        it('should call clear function', function () {
            spyOn(webSandboxService, 'clear');

            controller.choiceFunction();

            expect(webSandboxService.clear).toHaveBeenCalled();
        });
    });

    describe('when I call updateHtmlCode', function () {
        it('should assign value to code.html scope', function () {
            var mockHtmlCode = '<h1>Hello World</h1>';

            controller.updateHtmlCode(mockHtmlCode);

            expect(controller.code.html).toBe(mockHtmlCode);
        });
    });

    describe('when I call updateScriptCode', function () {
        it('should assign value to code.script scope', function () {
            var mockScriptCode = 'alert("Hello World");';

            controller.updateScriptCode(mockScriptCode);

            expect(controller.code.script).toBe(mockScriptCode);
        });
    });

    describe('when I call updateStyleCode', function () {
        it('should assign value to code.style scope', function () {
            var mockStyleCode = 'h1 {color: #000;}';

            controller.updateStyleCode(mockStyleCode);

            expect(controller.code.style).toBe(mockStyleCode);
        });
    });
});