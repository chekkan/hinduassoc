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

exports.deleteEvent = function(req, res) {
    var eventId = {_id: req.params.id};
    Event.remove(eventId, function(err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        return res.send(200);
    })
};

exports.updateEvent = function(req, res) {
    var eventUpdates = req.body;
    var eventId = eventUpdates._id;
    delete eventUpdates._id;
    Event.update({_id: eventId}, eventUpdates, function(err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        eventUpdates._id = eventId;
        return res.send(eventUpdates);
    });
};