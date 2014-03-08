angular.module('app').controller('haNavBarLoginCtrl', function($scope, $http, haIdentity, haNotifier, haAuth, $location) {
    $scope.identity = haIdentity;
    $scope.signin = function(username, password) {
        haAuth.authenticateUser(username, password).then(function(success) {
            if (success) {
                haNotifier.notify('You have successfully signed in!');
            } else {
                haNotifier.notify('Username/Password combination incorrect!');
            }
        });
    }

    $scope.signout = function() {
        haAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            haNotifier.notify("You have successfully signed out!");
            $location.path('/');
        });
    }
});
