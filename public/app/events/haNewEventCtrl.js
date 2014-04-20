angular.module('app').controller('haNewEventCtrl', function($scope, haEventData, $location, haNotifier) {

    $scope.createEvent = function() {
        var newEventData = {
            title: $scope.title,
            venue: $scope.venue,
            eventDate: $scope.eventDate,
            description: $scope.description
        };

        haEventData.createEvent(newEventData).then(function(newEventId) {
            haNotifier.notify('New Event created!');
            $location.path('/events/'+newEventId);
        }, function(reason) {
            haNotifier.error(reason);
        });
    }

});