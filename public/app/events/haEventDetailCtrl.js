angular.module('app').controller('haEventDetailCtrl', function ($scope, haEvent, $routeParams, haIdentity, $window) {
    $scope.event = haEvent.get({_id:$routeParams.id});

    $scope.isInRole = function(role) {
        return haIdentity.isAuthorized(role);
    };

    $scope.delete = function() {
        haEvent.delete({_id: $routeParams.id}, function() {
            $window.location.href = '/events/';
        }, function(error) {
            console.log(error);
        });
    };

});