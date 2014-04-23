angular.module('app').controller('haEventDetailCtrl', function ($scope, haEvent, $routeParams, haIdentity, haNotifier, $location) {
    $scope.event = haEvent.get({_id:$routeParams.id});

    $scope.isInRole = function(role) {
        return haIdentity.isAuthorized(role);
    };

    $scope.deleteEvent = function() {
        haEvent.delete({_id: $routeParams.id}, function() {
            haNotifier.notify('Event is deleted');
            $location.path('/events/');
        }, function(error) {
            haNotifier.notify(error);
        });
    };

});