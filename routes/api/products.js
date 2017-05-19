"use strict";

const express = require("express");
const api = express.Router();
const Product = require("../../model/Product");

api.get("/", (req, res, next) => {
    
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

api.post("/", (req, res,next) => {
	console.log(req.body);
	const product = new Product(req.body);
	product.save((err, productSaved) => {
		if (err){
			next(err);
			return;
		}
		res.json({
			success:true,
			result: productSaved
		});
	});
});


module.exports = api;







