var express = require("express"),
  stylus = require("stylus"),
  path = require("path"),
  passport = require("passport");

var rootPath = path.normalize(__dirname + "/../../");

module.exports = function(app, config) {
  function compile(str, path) {
    return stylus(str).set("filename", path);
  }

  app.set("views", rootPath + "/server/views");
  app.set("view engine", "pug");
  app.use(require("morgan")("dev"));
  app.use(require("cookie-parser")());
  app.use(require("body-parser").urlencoded({ extended: false }));
  app.use(express.json());
  app.use(require("express-session")({ secret: "hindu assoc unicorn" }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    stylus.middleware({
      src: rootPath + "/public",
      compile: compile
    })
  );
  app.use(express.static(rootPath + "/public"));
};
