angular.module('app').controller('haCreateUserCtrl', function($scope, haUser, haNotifier, $location, haAuth) {
    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        haAuth.createUser(newUserData).then(function(userId) {
            haNotifier.notify('User account created!');
            $location.path('/profile/'+userId);
        }, function(reason) {
            haNotifier.error(reason);
        });
    }
});