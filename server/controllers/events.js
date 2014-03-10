var Event = require('mongoose').model('Event');

exports.getEvents = function(req, res) {
    Event.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getEventById = function(req, res) {
    Event.findOne({_id: req.params.id}).exec(function(err, event) {
        res.send(event);
    })
};

exports.createEvent = function(req, res, next) {
    var eventData = req.body;
    Event.create(eventData, function(err, event) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(event)
    });
};