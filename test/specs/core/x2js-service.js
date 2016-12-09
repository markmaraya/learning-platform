'use strict';

describe('X2jsService', function () {

    var service;
    var mockString;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_X2jsService_) {
        service = _X2jsService_;
        mockString =    '<topic>' +
                        '<title>AngularJS</title>' +
                        '<icon>angular</icon>' +
                        '</topic>';
    }));

    describe('when I call xml_str2json', function () {
        it('should make use of the service', function () {
            service.xml_str2json(mockString);
        });

        it('should convert xml to json', function () {
            var returnData = {};
            returnData = service.xml_str2json(mockString);
            var result = { topic: { title: 'AngularJS', icon: 'angular' } };
            expect(result).toEqual(returnData);
        });
    });
});