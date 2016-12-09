'use strict';

describe('chapterContent', function () {

    var injector;
    var element, scope;

    beforeEach(function () {
        injector = angular.injector(['LearningPlatformApplication']);

        injector.invoke(function (_$rootScope_, _$compile_) {
            scope = _$rootScope_.$new();

            scope.data = '<h2>Title</h2>';

            element = _$compile_('<chapter-content content="data"></chapter-content>')(scope);
            scope.$apply();
        });
    });

    it('should have a div and h2 element', function () {
        expect(element.find('div').length).toEqual(1);
        expect(element.find('h2').length).toEqual(1);
        expect(element.find('h2').text()).toEqual('Title');
    });
});