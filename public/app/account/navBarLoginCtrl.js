angular.module('app').controller('navBarLoginCtrl', function($scope, $http, identity, notifier) {
    $scope.identity = identity;
    $scope.signin = function(username, password) {
        $http.post('/login', {username: username, password: password}).then(function(response) {
            if (response.data.success) {
                identity.currentUser = response.data.user;
                notifier.notify('You have successfully signed in!');
            } else {
                notifier.notify('Username/Password combination incorrect!');
            }
        });
    }
});
