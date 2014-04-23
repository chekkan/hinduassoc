describe('haEventDetailCtrl', function() {

    var params = { id: 0 };

    beforeEach(module('app'));

    describe('isInRole', function() {

        it('should return false for admin if not admin', inject(function(haUser, haIdentity, $rootScope, $controller) {
            var user = new haUser();
            user.roles = ['foo'];
            haIdentity.currentUser = user;
            var scope = $rootScope.$new();
            var eventDetailCtrl = $controller('haEventDetailCtrl', {$scope: scope, $routeParams: params});
            var actual = scope.isInRole('admin');
            expect(actual).to.be.false;
        }));

        it('should return true for admin if is admin', inject(function(haUser, haIdentity, $rootScope, $controller) {
            var user = new haUser();
            user.roles = ['admin'];
            haIdentity.currentUser = user;
            var scope = $rootScope.$new();
            $controller('haEventDetailCtrl', {$scope: scope, $routeParams: params});
            var actual = scope.isInRole('admin');
            expect(actual).to.be.true;
        }));

    });

    describe('deleteEvent', function() {

        it('should invoke delete method on the resource', inject(function($rootScope, $controller) {
            var eventSpy = {get: function() {}, delete: function() {} };
            sinon.spy(eventSpy, "delete");
            var scope = $rootScope.$new();
            $controller('haEventDetailCtrl', {$scope: scope, haEvent: eventSpy, $routeParams: params});
            scope.deleteEvent();
            expect(eventSpy.delete).to.have.been.called;
        }));

        it('should invoke delete method on the resource passing in an id', inject(function($rootScope, $controller) {
            var eventSpy = {get: function() {}, delete: function() {}};
            sinon.spy(eventSpy, "delete");
            var scope = $rootScope.$new();
            $controller('haEventDetailCtrl', {$scope: scope, haEvent: eventSpy, $routeParams: params});
            scope.deleteEvent();
            expect(eventSpy.delete).to.have.been.calledWith({_id:params.id});
        }));

        it('should invoke delete method on the resource passing in the route params id', inject(function($rootScope, $controller) {
            var eventSpy = {get: function() {}, delete: function() {}};
            sinon.spy(eventSpy, "delete");
            var scope = $rootScope.$new();
            params = { id: 1 };
            $controller('haEventDetailCtrl', {$scope: scope, haEvent: eventSpy, $routeParams: params});
            scope.deleteEvent();
            expect(eventSpy.delete).to.have.been.calledWith({_id:params.id});
        }));


    })

});