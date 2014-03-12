describe('haNewEventCtrl', function() {

    beforeEach(module('app'));

    describe('createEvent', function() {

        it('should call haEventData service passing in new event details');

        it('should call haNotifier.notify with message New Event Created! on success');

        it('should call $location.path with path to events details page with new event id passed on success');

        it('should call haNotifier.error with reason on failure');

    });

});