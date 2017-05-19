"use strict";
const mongoose = require("mongoose");

// Le decimos a mongoose que las promesas que vamos usar son globales
mongoose.Promise = global.Promise;

// Creamos los esquemas que vamos a usar 
const ProductSchema = mongoose.Schema({
	name:{
		type:String,
		index:true,
		lowercase:true,
		required: true
	},
	sell:{
		type:Boolean,
		index:true,
		required: true
	},
	picture:String,
	price:{
		type:Number,
		index:true,
		required: true
	},
	tag: {
		type:[String], 
		index: true,
		lowercase:true,
		enum: [
			"work", "lifestyle", "motor", "mobile"
		]
	}
});

ProductSchema.statics.list = function (filter, limit, skip, fields, sort, callback) {
	const query = Product.find(filter);
	query.limit(limit);
	query.skip(skip);
	query.sort(sort);
	query.select(fields);
	query.exec(callback);
};

var Product = mongoose.model("Product", ProductSchema);

// Exportamos los esquemas
module.exports = Product;

