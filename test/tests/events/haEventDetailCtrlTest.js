describe('haEventDetailCtrl', function() {

    beforeEach(module('app'));

    describe('isInRole', function() {

        it('should return false for admin if not admin', inject(function(haUser, haIdentity, $rootScope, $controller) {
            var user = new haUser();
            user.roles = ['foo'];
            haIdentity.currentUser = user;
            var scope = $rootScope.$new();
            var params = {id: 0};
            var eventDetailCtrl = $controller('haEventDetailCtrl', {$scope: scope, $routeParams: params});
            var actual = scope.isInRole('admin');
            expect(actual).to.be.false;
        }));

        it('should return true for admin if is admin', inject(function(haUser, haIdentity, $rootScope, $controller) {
            var user = new haUser();
            user.roles = ['admin'];
            haIdentity.currentUser = user;
            var scope = $rootScope.$new();
            var params = { id: 0};
            $controller('haEventDetailCtrl', {$scope: scope, $routeParams: params});
            var actual = scope.isInRole('admin');
            expect(actual).to.be.true;
        }));

    });

});