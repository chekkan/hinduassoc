var mongoose = require("mongoose");

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('hinduassoc db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            User.create({firstName: 'Harish', lastName: 'Babu', username: 'chekkan'});
            User.create({firstName: 'Arathy', lastName: 'Krishna', username: 'athy'});
            User.create({firstName: 'Abin', lastName: 'Jose', username: 'abin'});
        }
    });
};