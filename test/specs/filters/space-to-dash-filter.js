'use strict';

describe('spaceToDash', function () {

    var $filter;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('should change space to dash', function () {
        var mockString = 'hello world', result;
        var mockResult = 'hello-world';
        
        result = $filter('spaceToDash')(mockString);
        
        expect(result).toEqual(mockResult);
    });
});