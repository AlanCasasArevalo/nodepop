"use strict";

const express = require("express");
const api = express.Router();
const Product = require("../../model/Product");

api.get("/", (req, res, next) => {
    
	const name = req.query.name;
	const tag = req.query.tag;
	const sell = req.query.sell;
	const price = req.query.price;

	const limit = parseInt(req.query.limit);
	const skip = parseInt(req.query.skip);
	const fields = req.query.fields;
	const sort = req.query.sort;

	const filter = {};

	if (name){
		filter.name = {$regex: name};
	}

	if (tag){
		filter.tag = tag;
	}
	
	if (sell){
		filter.sell = sell;
	}

	if (price){
		if (price < 0){
			return res.json({
				success:false, 
				message:"El precio tiene que ser mayor que 0, no puede ser numero negativo"}
			);
		}else if(price <= 10){
			filter.price = {$lt:10};
		}else if(price >= 10 && price <= 50){
			filter.price = {$gte:10, $lte:50};
		}else if(price <= 50){
			filter.price = {$lte:50};
		}else if(price >= 100){
			filter.price = {$gte:100};
		}		
	}

	Product.list(filter, limit, skip, fields, sort, (err, products) => {
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

api.get("/tag",(req,res, next) => {

	Product.find().exec((err, tags) => {
		if(err) return next(err);

		res.json({ok:true, tags: tags});
	});
	
});

api.post("/", (req, res,next) => {
	console.log(req.body);
	const product = new Product(req.body);
	product.save((err, productSaved) => {
		if (err){
			return next(err);
		}
		res.json({
			success:true,
			result: productSaved
		});
	});
});

api.put("/:name", (req, res, next) => {
	const name = req.params.name;

	Product.update({name:name}, req.body, (err, productAct) => {
		if(err) return next(err);

		res.json({
			success: true,
			product: productAct
		});
	});
});

api.delete("/:name", (req, res, next) => {
	const name = req.params.name;

	Product.remove({name: name}, (err, productDel) => {
		if(err) return next(err);

		res.json({
			success:true,
			product: productDel
		});
	});
});

module.exports = api;







