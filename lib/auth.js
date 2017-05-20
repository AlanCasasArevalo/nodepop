"use strict";

const mongoose = require("mongoose");
const User = require("../model/User");
const service = require("../services");

// Funcion para registrarse en la app
function signUp(req, res) {
	// Creamos un usuario que tendra una serie de parametros configurados en el esquema
	const user  = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	// Guardamos el usuario en la base de datos
	user.save((err) =>{
		// Si hay error codigo y mensaje
		if (err){
			 res.json({
				message: `Error al crear el usuario ${err}`
			});
			return;
		}
		// Si todo ok le damos un token al usuario (Token es como una clave para poder tener mejor seguridad)
		return res.json({
			token: service.createToken(user)
		});
	});
}

// Funcion de entrada usuarios ya registrados
function signIn(req, res) {
	// Buscamos el usuario mediante el email
	User.find({
		email:req.body.email
	}, (err, user) => {
		// Si hay error mensaje y codigo al usuario
		if (err) return res.json({
			message: err
		});
		if(!user) return res.json({
			message: "No existe el usuario "
		});

		// Si el usuario esta y esta bien logeado mensaje y codigo de logeo 
		req.user = user;
		res.json({
			message:"Te has logueado correctamente",
			token: service.createToken(user)
		});
	});
}

// Exportamos los metodos.
module.exports = {
	signIn,
	signUp
};
