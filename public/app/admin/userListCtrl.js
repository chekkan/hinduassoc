angular.module('app').controller('userListCtrl', function($scope, haUser) {
    $scope.users = haUser.query();
});