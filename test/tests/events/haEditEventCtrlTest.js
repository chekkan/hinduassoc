
describe('haEditEventCtrl', function() {

    var params, scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope) {
        params = {id: 0};
        scope = $rootScope.$new();
    }));

    async.each([0, 1], function(id, callback) {

        it('should have event id in route parameter and set in scope', inject(function ($controller) {
            var eventStub = { _id: id, title: 'foo'};
            var eventMock = {
                get: function() {
                    return eventStub;
                }
            };
            params = {id: id};
            $controller('haEditEventCtrl', {$scope: scope, $routeParams: params, haEvent: eventMock});
            assert.equal(scope.event._id, id);
        }));

        callback();
    });

    it('should have event with id from route parameter set to scope', inject(function($controller) {
        var eventStub = { _id: 0, title: 'foo'};
        var eventMock = {
            get: function() {
                return eventStub;
            }
        };
        $controller('haEditEventCtrl', {$scope: scope, $routeParams: params, haEvent: eventMock});
        assert.deepEqual(scope.event, eventStub);
    }));

    async.each([
        [new Date(2012, 2, 21), '2012-03-21'],
        [new Date(2011, 4, 2), '2011-05-02'],
        [new Date(1990, 10, 12), '1990-11-12']
    ], function(data, callback) {

        it('should set eventDate property in yyyy-MM-dd format', inject(function ($controller) {
            var eventStub = { _id: 0, title: 'foo', eventDate: data[0]};
            var eventMock = {
                get: function () {
                    return eventStub;
                }
            };
            $controller('haEditEventCtrl', {$scope: scope, $routeParams: params, haEvent: eventMock});
            scope.$apply();
            assert.equal(scope.event.eventDate, data[1])
        }));

        callback();

    });

    describe('editEvent', function() {

        it('is a function', inject(function($controller) {
            $controller('haEditEventCtrl', { $scope: scope, $routeParams: params});
            assert.isFunction(scope.editEvent);
        }));

        it('invokes update method on the event in scope', inject(function($controller) {
            var eventStub = {
                _id: 0,
                title: 'foo',
                $update: function() {
                    return {then: function(){} }
                }
            };
            var eventMock = {
                get: function () {
                    return eventStub;
                }
            };
            sinon.spy(eventStub, "$update");
            $controller('haEditEventCtrl', { $scope: scope, $routeParams: params, haEvent: eventMock});
            scope.editEvent();
            eventStub.$update.should.have.been.calledOnce;
        }));

    });
});