angular.module('app').factory('identity', function($window, haUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new haUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    }
});