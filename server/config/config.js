var path = require("path");
var rootPath = path.normalize(__dirname + "/../../");
module.exports = {
  development: {
    rootPath: rootPath,
    db: "mongodb://localhost/hinduassoc",
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: "mongodb://chekkan:chekkan@ds027799.mongolab.com:27799/hinduassoc",
    port: process.env.PORT || 80
  }
};
