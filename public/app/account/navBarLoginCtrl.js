angular.module('app').controller('navBarLoginCtrl', function($scope, $http, identity, notifier, auth, $location) {
    $scope.identity = identity;
    $scope.signin = function(username, password) {
        auth.authenticateUser(username, password).then(function(success) {
            if (success) {
                notifier.notify('You have successfully signed in!');
            } else {
                notifier.notify('Username/Password combination incorrect!');
            }
        });
    }

    $scope.signout = function() {
        auth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            notifier.notify("You have successfully signed out!");
            $location.path('/');
        });
    }
});
