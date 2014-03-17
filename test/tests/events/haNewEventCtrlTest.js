describe('haNewEventCtrl', function () {
    var $scope;

    beforeEach(module('app'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value("$scope", $scope);
        });
    });

    describe('createEvent', function () {

        xit('should call haEventData service passing in new event details', inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new;
            $scope.title = "foo";
            $scope.venue = "bar"
            $scope.eventDate = new Date();
            $scope.description = "baz";

            var newEventCtrl = $controller("haNewEventCtrl");
        }));

        it('should call haNotifier.notify with message New Event Created! on success');

        it('should call $location.path with path to events details page with new event id passed on success');

        it('should call haNotifier.error with reason on failure');

    });

});