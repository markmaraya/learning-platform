'use strict';

describe('LessonListService', function () {

    var service;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_LessonListService_) {
        service = _LessonListService_;
    }));

    describe('when I call getDetails', function () {
        it('should make use of the service', function () {
            spyOn(service, 'getDetails');

            service.getDetails();

            expect(service.getDetails).toHaveBeenCalled();
        });
    });
});