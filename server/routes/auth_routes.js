const Landlord = require('../models/landlord_model');
const jwt = require('jwt-simple');
const config = require('../config');

// private function not exported
function tokenForLandlord(landlord){
	const timestamp = new Date().getTime();
	return jwt.encode({ 
		// jwt (json web token) by convention has a sub (subject) property to describe who this token belongs to
		sub: landlord.id,
		// jwt (json web token) also by convention has a iat (issued at time) property to describe when the token was made/issued
		iat: timestamp
	}, config.secret);
}

// GET /
exports.authtest = function(req, res, next){
	res.send({message:'Super secret code is ABC123'});
}

// POST /signin
exports.signin = function(req, res, next){
	// Landlord has already had their email and password auth'd
	// we just need to give them a token by passing in the landlord to the tokenForLandlord token generator
	res.send({token: tokenForLandlord(req.user)});
}

// POST /signup
exports.signup = function(req, res, next){
	const email = req.body.email;
	const password = req.body.password;
	// check that the request has an email and password
	if(!email || !password){
		return res.status(422).send({error:"You must provide email and password"});
	}

	// See if a landlord with a given email exists
	Landlord.findOne({email: email}, function(err, existingLandlord){
		if(err){return next(err);}
		// if a landlord with this email does exist, we will return an error on request
		if(existingLandlord){
			// status() sets the error code (eg. 404 Not Found)
			// Errorcode 402 Unprocessable Entity
			return res.status(402).send({error: "Email is in use"});
		}
		// If a landlord does not exist, create and save new landlord
		// const landlord is only a variable, it has not yet saved to the db
		const landlord = new Landlord({
			email: email,
			password: password
		});
		// save() actually saves the new landlord to the db
		// pass in a callback indicating the landlord was created
		landlord.save(function(err){
			if(err){return next(err);}
			// Respond to request indicating the landlord was created
			res.json({token: tokenForLandlord(landlord)});
		});
	});
}