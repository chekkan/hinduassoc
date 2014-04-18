angular.module('app').controller('haEventDetailCtrl', function($scope, haEvent, $routeParams, haIdentity) {
    $scope.event = haEvent.get({_id:$routeParams.id});

    $scope.isInRole = function(role) {
        return haIdentity.isAuthorized(role);
    }
});