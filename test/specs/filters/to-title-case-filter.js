'use strict';

describe('toTitleCase', function () {

    var $filter;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));


    it('should convert the string to Title Case', function () {
        var mockString = 'hello world', result;
        var mockResult = 'Hello World';
        
        result = $filter('toTitleCase')(mockString);
        
        expect(result).toEqual(mockResult);
    });
});