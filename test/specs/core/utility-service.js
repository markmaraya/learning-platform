'use strict';

describe('UtilityService', function () {

    var $controller, $scope;
    var controller, service;
    var mockChapterList, htmlcodeResult, scriptcodeResult;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$controller_, _UtilityService_) {
        service = _UtilityService_;
        $controller = _$controller_;

        controller = $controller('LessonController', {
            $scope: $scope
        });

        controller.chapter = {
            code: {
                htmlcode:
                '   <h1>hello</h1>' +
                '/tb1<h2>world</h2>   ',
                scriptcode:
                '   app.controller("myController", ["$scope", function ($scope) {' +
                '/tb2$scope.firstName = "John";' +
                '/tb1}]);   ',
                stylecode: ''
            }
        };

        mockChapterList = [
            {
                level: 'beginner',
                title: 'title1',
                code: {
                    htmlcode:
                    '   <h1>hello</h1>' +
                    '/tb1<h2>world</h2>   ',
                    scriptcode:
                    '   app.controller("myController", ["$scope", function ($scope) {' +
                    '/tb2$scope.firstName = "John";' +
                    '/tb1}]);   ',
                    stylecode: ''
                }
            },
            {
                level: 'beginner',
                title: 'title2',
                code: {
                    htmlcode: '',
                    scriptcode: '',
                    stylecode: ''
                }
            },
            {
                level: 'intermediate',
                title: 'title3',
                code: {
                    htmlcode: '',
                    scriptcode: '',
                    stylecode: ''
                }
            }
        ];

        htmlcodeResult = '<h1>hello</h1>   <h2>world</h2>';
        scriptcodeResult = 'app.controller("myController", ["$scope", function ($scope) {' +
            '      $scope.firstName = "John";' +
            '   }]);';
    }));

    describe('when I call TrimCDataForView', function () {
        it('should trim CData code for view', function () {
            var htmlcodeReturn = service.TrimCDataForView(controller.chapter.code.htmlcode);
            var scriptcodeReturn = service.TrimCDataForView(controller.chapter.code.scriptcode);

            expect(htmlcodeResult).toBe(htmlcodeReturn);
            expect(scriptcodeResult).toBe(scriptcodeReturn);
        });
    });

    describe('when I call GetTitleByLevel', function () {
        it('should get data for titleList and chapter', function () {
            var mockLevel = 'beginner';

            service.GetTitleByLevel(controller, mockChapterList, mockLevel);

            expect(controller.titleList).toEqual(['title1', 'title2']);
            expect(controller.chapter).toBe(mockChapterList[0]);
        });
    });

    describe('when I call AddCodeValue', function () {
        it('should add values of code object', function () {
            service.AddCodeValue(controller);

            expect(controller.code.html).toBe(htmlcodeResult);
            expect(controller.code.script).toBe(scriptcodeResult);
        });
    });

    describe('when I call CopyCodeValue', function () {
        it('should copy the values of code object', function () {
            service.AddCodeValue(controller);
            service.CopyCodeValue(controller);

            expect(controller.htmlCodeCopy).toBe(controller.code.html);
            expect(controller.scriptCodeCopy).toBe(controller.code.script);
        });
    });

    describe('when I call GetChapter', function () {
        it('should get the value of the given lesson', function () {
            var mockLesson = 'title1';

            service.GetChapter(controller, mockLesson, mockChapterList);

            expect(controller.chapter.title).toBe(mockLesson);
        });
    });

    describe('when I call showHideLesson', function () {
        it('should set the correct values for list object', function () {
            var mockLesson = 'title1';
            var mockResult = 'show-lesson';
            var mockElseResult = 'hide-lesson';
            var mockList = [
                { title: 'title1' },
                { title: 'title2' }
            ];

            service.showHideLesson(mockLesson, mockList);

            expect(mockList[0].hide).toBe(mockResult);
            expect(mockList[1].hide).toBe(mockElseResult);
        });
    });

    describe('when I call webSandboxCode', function () {
        it('should set a values for wscode scope', function () {
            service.webSandboxCode(controller);

            expect(controller.wscode).toBeTruthy();
        });
    });

    describe('when I call hidePagination', function () {
        it('should set the value of hidePagination to true', function () {
            controller.totalItems = 10;

            service.hidePagination(controller);

            expect(controller.hidePagination).toBeTruthy();
            expect(controller.hidePagination).toBe(true);
        });

        it('should set the value of hidePagination to false', function () {
            service.hidePagination(controller);

            expect(controller.hidePagination).toBe(false);
        });
    });
});