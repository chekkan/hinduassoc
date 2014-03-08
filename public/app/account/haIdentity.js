angular.module('app').factory('haIdentity', function($window, haUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new haUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});