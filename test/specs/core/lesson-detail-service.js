'use strict';

describe('LessonListService', function () {

    var service;
    var httpBackend;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_$httpBackend_, _LessonListService_) {
        httpBackend = _$httpBackend_;
        service = _LessonListService_;
    }));

    describe('when I call getDetails', function () {
        it('should make use of the service', function () {
            service.getDetails();
        });

        it('should return a promise', function () {
            var returnData = {};
            httpBackend.whenGET('../materials/lessons.xml').respond(returnData);
            var result = {};
            httpBackend.whenGET(service.getDetails()).respond(result);
            expect(result).toEqual(returnData);
        });
    });
});