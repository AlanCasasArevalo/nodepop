"use strict";

const express = require("express");
const api = express.Router();
const User = require("../../model/User");
const auth = require("../../middlewares/auth");
const userCtrl = require("../../lib/auth");

/*
api.get("/", auth, (req, res, next) => {
    
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
*/

api.post("/signup", userCtrl.signUp, (req, res,next) => {
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


api.post("/signin", userCtrl.signIn, (req, res,next) => {
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







