describe('haEventDetailCtrl', function() {

    beforeEach(module('app'));

    describe('isInRole', function() {

        it('should return false for admin if not admin', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var params = {id: 0};
            var eventDetailCtrl = $controller('haEventDetailCtrl', {$scope: scope, $routeParams: params});
            var actual = scope.isInRole('admin');
            expect(actual).to.be.false;
        }));

    });

});