angular.module('app').controller('haProfileCtrl', function($scope, haIdentity, haAuth, haNotifier, $routeParams, haUser) {

    if($routeParams.id && haIdentity.isAuthorized('admin')) {
        haUser.get({_id: $routeParams.id})
            .$promise.then(function(user) {
                $scope.email = user.username;
                $scope.fname = user.firstName;
                $scope.lname = user.lastName;
            });
    } else {
        $scope.email = haIdentity.currentUser.username;
        $scope.fname = haIdentity.currentUser.firstName;
        $scope.lname = haIdentity.currentUser.lastName;
    }

    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        if($routeParams.id && haIdentity.isAuthorized('admin')) {
            haUser.get({_id: $routeParams.id})
                .$promise.then(function(user) {
                    angular.extend(user, newUserData);
                    user.$update().then(function () {
                        haNotifier.notify('User account has been updated');
                    }, function (reason) {
                        haNotifier.error(reason);
                    })
                });
        } else {
            haAuth.updateCurrentUser(newUserData).then(function () {
                haNotifier.notify('Your user account has been updated');
            }, function (reason) {
                haNotifier.error(reason);
            });
        }
    }
});