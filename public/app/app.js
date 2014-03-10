angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function (haAuth) {
            return haAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function (haAuth) {
            return haAuth.authorizeAuthenticateUserForRoute()
        }}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'haMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'haUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'haSignupCtrl'
        }).when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'haProfileCtrl', resolve: routeRoleChecks.user
        }).when('/events', { templateUrl: '/partials/events/event-list',
            controller: 'haEventListCtrl'
        }).when('/events/new', { templateUrl: '/partials/events/new-event',
            controller: 'haNewEventCtrl', resolve: routeRoleChecks.admin
        }).when('/events/:id', { templateUrl: '/partials/events/event-details',
            controller: 'haEventDetailCtrl'
        });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection == "not authorized") {
            $location.path('/');
        }
    });
})