"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
var subNumber = 0;
const config = require("../config");

function createToken(user) {
	const payload = {
		sub: subNumber += 1,
		iat: moment().unix(),
		exp: moment().add(14, "days").unix()
	};
	return jwt.encode(payload,config.SECRET_TOKEN);
}

function decodeToken(token) {
	const decoded = new Promise((resolve, reject) =>{
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN);

			if(payload.exp <= moment().unix()){
				resolve({
					status :401,
					message:"El token ha expirado"
				});
			}
		
			resolve(payload.sub);

		}catch (err){
			reject({
				status:500,
				message: "INVALID TOKEN"
			});
		}
	});
	return decoded;
}

module.exports = {
	createToken, 
	decodeToken
};



