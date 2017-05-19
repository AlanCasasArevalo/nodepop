"use strict";

const express = require("express");
const api = express.Router();
const User = require("../../model/User");

api.get("/", (req, res, next) => {
    
	User.find().exec((err, users) => {
		if(err){
			next(err);
			return;
		}
		res.json({
			success:true,
			result:users
		});
	});   
});

api.post("/", (req, res,next) => {
	console.log(req.body);
	const product = new User(req.body);
	product.save((err, userSaved) => {
		if (err){
			next(err);
			return;
		}
		res.json({
			success:true,
			result: userSaved
		});
	});
});


module.exports = api;







