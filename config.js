"use strict";

// Exportamos los modulos
module.exports = {
	// Decimos que el puerto sera o bien el que nos pasen o por defecto el 3000
	port: process.env.PORT || 3000,
	// Decimos que el proceso sera el que nos pasen o por defecto la base de mongo en el puerto local 27017 y la db shop
	db: process.env.MONGODB || "mongodb://localhost:27017/nodepop",

	// Creamos un token secreto TIENE QUE SER ELABORADO
	SECRET_TOKEN:"n5354344534534o364y637856d856e8p896789o96967p"
};



