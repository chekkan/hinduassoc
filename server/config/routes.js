var auth = require("./auth"),
    users = require("../controllers/users"),
    events = require("../controllers/events"),
    mongoose = require("mongoose"),
    User = mongoose.model('User');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.get('/api/users/:id', auth.requiresRole('admin'), users.getUserById);
    app.post('/api/users', auth.requiresRole('admin'), users.createUser);
    app.put('/api/users', users.updateUser);
    app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);

    app.get('/api/events', events.getEvents);
    app.get('/api/events/:id', events.getEventById);
    app.post('/api/events', events.createEvent);
    app.delete('/api/events/:id', auth.requiresRole('admin'), events.deleteEvent);
    app.put('/api/events', auth.requiresRole('admin'), events.updateEvent);

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/'+ req.params);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

}
