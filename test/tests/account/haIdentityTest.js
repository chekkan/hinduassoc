describe('haIdentity', function() {
    var mockWindow;

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
        mockWindow = $injector.get('$window');
        mockWindow = {};
    }));

    describe('isAuthenticated', function() {

        it('should return true if user is logged in', inject(function(haUser, haIdentity) {
            haIdentity.currentUser = new haUser();
            expect(haIdentity.isAuthenticated()).to.be.true;
        }));

        xit('should return true if user object is bootstrapped in the window scope', inject(function($injector) {
            mockWindow.bootstrappedUserObject = { _id : 1 };
            var identity = $injector.get('haIdentity');
            expect(identity.isAuthenticated()).to.be.true;
        }));

    });

    describe('isAuthorized', function() {
        it('should return false when user is not logged in', inject(function(haIdentity) {
            expect(haIdentity.isAuthorized('admin')).to.be.falsy;
        }));

        it('passed in with admin role should return false when user is not admin', inject(function(haUser, haIdentity) {
            var user = new haUser();
            user.roles = ['not admin'];
            haIdentity.currentUser = user;
            expect(haIdentity.isAuthorized('admin')).to.be.falsy;
        }));

        it('passed in with a role not available in user should return false', inject(function(haUser, haIdentity) {
            var user = new haUser();
            user.roles = ['admin'];
            haIdentity.currentUser = user;
            expect(haIdentity.isAuthorized('blah')).to.be.falsy;
        }));
    });
});