"use strict";
const mongoose = require("mongoose");

// Le decimos a mongoose que las promesas que vamos usar son globales
mongoose.Promise = global.Promise;

// Creamos los esquemas que vamos a usar 
const UserSchema = mongoose.Schema({
	name:{
		type:String,
		unique:true,
		required: true
	},
	email:{
		type:String,
		unique:true,
		required: true
	},
	password:{
		type:String,
		select: false,
		required: true
	}
});

var User = mongoose.model("User", UserSchema);

// Exportamos los esquemas
module.exports = User;

