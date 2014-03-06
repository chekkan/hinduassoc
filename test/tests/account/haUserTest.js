describe('haUser', function() {
    beforeEach(module('app'));

    describe('isAdmin', function() {
        it('should return false if the roles array does not have an admin entry', inject(function(haUser) {
            var user = new haUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;
        }));
    });
});