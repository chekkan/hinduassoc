angular.module('app').controller('haSignupCtrl', function($scope, haUser, notifier, $location, auth) {
    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        auth.createUser(newUserData).then(function() {
            notifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            notifier.error(reason);
        });
    }
});