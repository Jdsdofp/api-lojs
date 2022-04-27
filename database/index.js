const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/api-lojs");
mongoose.Promise = global.Promise;

module.exports = mongoose;