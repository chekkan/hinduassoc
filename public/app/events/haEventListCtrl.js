angular.module('app').controller('haEventListCtrl', function($scope, haEvent, haIdentity) {
    $scope.events = haEvent.query();

    $scope.sortOptions = [
        {value: "title", text: "Sort by Title"},
        {value: "eventDate", text: "Sort by Event Date"}];

    $scope.sortOrder = $scope.sortOptions[1].value;

    $scope.isInRole = function(role) {
    	return haIdentity.isAuthorized(role);
    }

});