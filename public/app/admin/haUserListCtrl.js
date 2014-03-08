angular.module('app').controller('haUserListCtrl', function($scope, haUser) {
    $scope.users = haUser.query();
});