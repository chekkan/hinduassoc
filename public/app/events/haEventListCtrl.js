angular.module('app').controller('haEventListCtrl', function($scope, haEvent) {
    $scope.events = haEvent.query();
});