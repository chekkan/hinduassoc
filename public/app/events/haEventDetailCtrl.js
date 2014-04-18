angular.module('app').controller('haEventDetailCtrl', function($scope, haEvent, $routeParams) {
    $scope.event = haEvent.get({_id:$routeParams.id});

    $scope.isInRole = function(role) {
        return false;
    }
});