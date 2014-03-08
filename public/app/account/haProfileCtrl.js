angular.module('app').controller('haProfileCtrl', function($scope, haIdentity, haAuth, haNotifier) {

    $scope.email = haIdentity.currentUser.username;
    $scope.fname = haIdentity.currentUser.firstName;
    $scope.lname = haIdentity.currentUser.lastName;


    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstname: $scope.fname,
            lastName: $scope.lname
        };
        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        haAuth.updateCurrentUser(newUserData).then(function() {
            haNotifier.notify('Your user account has been updated');
        }, function(reason) {
            haNotifier.error(reason);
        });
    }
});