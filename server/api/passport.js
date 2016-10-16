// passport.js is used for auth
const passport = require('passport');
const Landlord = require('../models/landlord_model');
// our secret string 
const config = require('../config');	
// JWT Strategy (json web token)
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// Local Strategy 
const LocalStrategy = require('passport-local');


// Passport.js uses "strategies" to handle login flows
// Each strategy is a library for login (eg. Facebook, Google+, Web Tokens, Cookies...etc)
// Each passport strategy follows a similar process of set-up

// STRATEGY #1
// This strategy is for local authentication, that is: custom email and password
// This is the inital login flow where landlord enters email and password, and returns a token for future jwt auth
// 1. Set up options for JWT Strategy
// the passport-local library by default looks for a field 'password', but the username field must be explicitly identified
const localOptions = {usernameField: 'email'};
// 2. Create JWT strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// Verify this username and password, and then call done() with landlord if it is the correct username and password
	// otherwise call done with false
	Landlord.findOne({email: email}, function(err, landlord){
		// return error if err occurs
		if(err){return done(err)};
		// return false if no landlord by that email is found
		if(!landlord){return done(null, false);}
		// if landlord found, then compare passwords + salt using the userSchema method comparePassword()
		landlord.comparePassword(password, function(err, isMatch){
			if(err){return done(err);}
			// return done(null, false) if passwords did not match
			if(!isMatch){return done(null, false);}
			// return done(null, landlord) if passwords matched
			// this passport strategy will act as middlware, and done() allows the flow to continue onto the next piece of middleware
			// by supplying `landlord` as the 2nd arg to done(), passport will automatically set the outgoing req.landlord to contain `landlord`
			return done(null, landlord);
		});
	});
});
// 3. Tell passport to use this strategy
passport.use(localLogin);

// STRATEGY #2
// This strategy is for jwt (json web tokens) - which are the tokens that clients use for auth, AFTER they have already done an initial auth with email/password
// 1. Set up options for JWT Strategy
const jwtOptions = {
	// 1a) since the jwt token is in the header of the request, we need to extract it from the auth header field
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	// 2b) we also give the token secret to decode the hashed token
	secretOrKey: config.secret
};
// 2. Create JWT strategy
// callback(payload, done) ---> payload is the jwt token payload (eg. {sub: landlord.id,iat: timestamp})
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// See if the landlord id in the payload already exists in our db
	// If it does, call 'done' with that id
	// otherwise, call done without a landlord object
	Landlord.findById(payload.sub, function(err, landlord){
		// done() args is 1. error object, and 2. landlord object
		if(err){return done(err, false);}
		// done() with null and landlord object if found
		if(landlord){
			done(null, landlord);
		}
		// done() with null and false if not found
		else{
			done(null, false);
		}
	});
});
// 3. Tell passport to use this strategy
passport.use(jwtLogin);




