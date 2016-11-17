'use strict';

describe('contentCode', function () {

    var injector;
    var scope;
    var elementTab1, elementTab2, elementTab3, elementTab4, elementNextLine, elementLessThan, elementGreaterThan;
    var mockTab1, mockTab2, mockTab3, mockTab4, mockNextLine, mockLessThan, mockGreaterThan;

    beforeEach(function () {
        injector = angular.injector(['LearningPlatformApplication']);

        injector.invoke(function (_$rootScope_, _$compile_) {
            scope = _$rootScope_.$new();

            mockTab1 = '/tb1tab1';
            mockTab2 = '/tb2tab2';
            mockTab3 = '/tb3tab3';
            mockTab4 = '/tb4tab4';
            mockNextLine = '/nlnextLine';
            mockLessThan = '/ltlessThan';
            mockGreaterThan = '/gtgreaterThan';

            elementTab1 = _$compile_('<span content-code>' + mockTab1 + '</span>')(scope);
            elementTab2 = _$compile_('<span content-code>' + mockTab2 + '</span>')(scope);
            elementTab3 = _$compile_('<span content-code>' + mockTab3 + '</span>')(scope);
            elementTab4 = _$compile_('<span content-code>' + mockTab4 + '</span>')(scope);
            elementNextLine = _$compile_('<span content-code>' + mockNextLine + '</span>')(scope);
            elementLessThan = _$compile_('<span content-code>' + mockLessThan + '</span>')(scope);
            elementGreaterThan = _$compile_('<span content-code>' + mockGreaterThan + '</span>')(scope);

            scope.$apply();
        });
    });

    it('should convert the patterns to its assinged output', function () {
        expect(elementTab1.text()).toEqual('   tab1');
        expect(elementTab2.text()).toEqual('      tab2');
        expect(elementTab3.text()).toEqual('         tab3');
        expect(elementTab4.text()).toEqual('            tab4');
        expect(elementNextLine.text()).toEqual('nextLine');
        expect(elementLessThan.text()).toEqual('<lessThan');
        expect(elementGreaterThan.text()).toEqual('>greaterThan');
    });
});