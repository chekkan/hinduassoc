angular.module('app').controller('haEditEventCtrl', function(haEvent, $routeParams, $scope, $filter, haNotifier) {

    $scope.event = haEvent.get({_id: $routeParams.id});

    $scope.$watch('event.eventDate', function() {
        $scope.event.eventDate = $filter('date')($scope.event.eventDate, 'yyyy-MM-dd');
    });

    $scope.editEvent = function() {
        $scope.event.$update().then(function() {
            haNotifier.notify('Updated');
        }, function(response) {
            haNotifier.error(response);
        });
    }

});