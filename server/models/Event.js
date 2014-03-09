var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    title: {type:String, required: '{PATH} is required!'},
    eventDate: {type:Date, required: '{PATH} is required!'},
});

var Event = mongoose.model('Event', eventSchema);

function createDefaultEvents() {
    Event.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Event.create({title: "Monthly Meeting", eventDate: new Date('09/11/2013')});
            Event.create({title: "Monthly Meeting", eventDate: new Date('11/12/2013')});
            Event.create({title: "Vishu get together", eventDate: new Date('09/04/2014')});
        }
    });
}

exports.createDefaultEvents = createDefaultEvents;