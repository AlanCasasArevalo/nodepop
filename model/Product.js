"use strict";
const mongoose = require("mongoose");

// Le decimos a mongoose que las promesas que vamos usar son globales
mongoose.Promise = global.Promise;

// Creamos los esquemas que vamos a usar 
const ProductSchema = mongoose.Schema({
	name:{
		type:String,
		index:true
	},
	sell:{
		type:Boolean,
		index:true
	},
	picture:String,
	price:{
		type:Number,
		index:true
	},
	category: {
		type:String, 
		enum: [
			"work", "lifestyle", "motor", "mobile"
		]
	}
});

const Product = mongoose.model("Product", ProductSchema);

// Exportamos los esquemas
module.exports = Product;

