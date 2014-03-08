angular.module('app').controller('haSignupCtrl', function($scope, haUser, haNotifier, $location, haAuth) {
    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        haAuth.createUser(newUserData).then(function() {
            haNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            haNotifier.error(reason);
        });
    }
});