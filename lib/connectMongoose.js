"use strict";
var mongoose = require("mongoose");

var db = mongoose.connection;

db.on("error", function (error) {
	console.log (error);
});

db.once("open", function () {
	console.log("conectado a mongodb");
});

mongoose.connect("mongodb://node:nodepopApiRestFull@localhost/nodepop");




