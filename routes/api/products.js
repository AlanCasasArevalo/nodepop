"use strict";

const express = require("express");
const api = express.Router();
const Product = require("../../model/Product");

api.get("/products", (req, res, next) => {
    
	Product.find().exec((err, products) => {
		if(err){
			next(err);
			return;
		}



		res.json({
			success:true,
			result:products
		});

	});   
});


module.exports = api;







