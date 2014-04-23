var User = require("mongoose").model("User"),
    encrypt = require("../utilities/encryption");

exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getUserById = function(req, res) {
    User.findOne({_id: req.params.id}).exec(function(err, user) {
        res.send(user);
    });
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function(err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(user);
    });
};

exports.updateUser = function(req, res) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    } else if(req.user._id != userUpdates._id && req.user.hasRole('admin')) {
        User.findById(userUpdates._id, function(err, doc) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            doc.firstName = userUpdates.firstName;
            doc.lastName = userUpdates.lastName;
            doc.username = userUpdates.username;
            if (userUpdates.password && userUpdates.password.length > 0) {
                doc.salt = encrypt.createSalt();
                doc.hashed_pwd = encrypt.hashPwd(doc.salt, userUpdates.password);
            }
            doc.save(function(e) {
                if (e) {
                    res.status(400);
                    return res.send({reason: e.toString()});
                }
                return res.send(req.user);
            });
        });
    } else {
        req.user.firstName = userUpdates.firstName;
        req.user.lastName = userUpdates.lastName;
        req.user.username = userUpdates.username;
        if (userUpdates.password && userUpdates.password.length > 0) {
            req.user.salt = encrypt.createSalt();
            req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
        }
        req.user.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            return res.send(req.user);
        });
    }
};

exports.deleteUser = function(req, res) {
    // check that the user is an admin
    if (req.user.hasRole('admin')) {
        // don't want to let user delete themselves
        var deleteUserId = req.params.id;
        console.log(deleteUserId);
        if (deleteUserId !== req.user._id) {
            User.findById(deleteUserId, function(err, user) {
                if(err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                user.remove(function(err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason:err.toString()});
                    }
                    return res.send(200);
                });
            })
        } else {
            return res.send(405);
        }
    } else {
        return res.send(404);
    }
};