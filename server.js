var express = require("express");
var config = require("config");

var app = express();

var configObj = config.util.toObject();

require("./server/config/express")(app, configObj);

require("./server/config/mongoose")(configObj);

require("./server/config/passport")();

require("./server/config/routes")(app);

app.listen(config.get("port"));
console.log("Listening on port " + config.get("port") + "...");
