var mongoose = require("mongoose"),
    crypto = require("crypto");

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
        username: String,
        salt: String,
        hashed_pwd: String
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'chekkan');
            User.create({firstName: 'Harish', lastName: 'Babu', username: 'chekkan', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'athy');
            User.create({firstName: 'Arathy', lastName: 'Krishna', username: 'athy', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'abin');
            User.create({firstName: 'Abin', lastName: 'Jose', username: 'abin', salt: salt, hashed_pwd: hash});
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}