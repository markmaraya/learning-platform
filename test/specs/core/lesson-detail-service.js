'use strict';

describe('LessonDetailService', function () {

    var service;

    beforeEach(module('LearningPlatformApplication'));

    beforeEach(inject(function (_LessonDetailService_) {
        service = _LessonDetailService_;        
    }));

    describe('when I call getDetails', function () {
        it('should make use of the service', function () {
            spyOn(service, 'getDetails');

            service.getDetails();

            expect(service.getDetails).toHaveBeenCalled();
        });
    });
});