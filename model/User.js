"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

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


// Creamos una funcion para que antes de guardar el usuario se guarde las contraseñas
UserSchema.pre("save", (next) => {
	// Creamos el usuario
	let user = this;

	// Encriptamos la contraseña 
	bcrypt.genSalt(10, (err, salt) => {
		// Si hay error pasamos el error 
		if (err) return next();
		// si no entonces metemos la contraseña en el campo contraseña pasandole un salto y codigos de error 
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			// Si hay error pasamos el error
			if(err) return next(err);
			// Si no pasamos la contraseña ya hasheada 
			user.password = hash;
			// Pasamos al siguiente middleware
			next();
		});
	});
});



var User = mongoose.model("User", UserSchema);

// Exportamos los esquemas
module.exports = User;

