'use strict';

describe('prism', function () {

    var injector;
    var element, scope;

    beforeEach(function () {
        injector = angular.injector(['LearningPlatformApplication']);

        injector.invoke(function (_$rootScope_, _$compile_) {
            scope = _$rootScope_.$new();

            element = _$compile_('<span prism><h1>hello</h1></span>')(scope);
            scope.$apply();
        });
    });

    it('should call highlight element function of Prism', function () {
        expect(element.attr('prism')).toBeDefined();
        expect(element.attr('prism')).toBeFalsy();
    });
});