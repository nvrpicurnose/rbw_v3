const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const landlordSchema = new Schema({
	// unique is a mongoose attribute that tells mongoose to enforce uniqueness in db emails
	// lowercase is a mongoose attribute that tells mongoose to convert all emails into lowercase (useful here so that joe@email.com == JOE@email.com)
	email: {type: String, unique: true, lowercase: true},
	company_name: String,
	company_logo: String,
	password: String
});

// Before each save (on save hook), run this function (which encrypts password)
landlordSchema.pre('save', function(next){
	// the context of this function is the landlord model that called this function
	const landlord = this;
	// generate a salt and then run callback
	bcrypt.genSalt(10, function(err, salt){
		if(err){return next(err);}
		// hash (encrypt) our password using the salt
		bcrypt.hash(landlord.password, salt, null, function(err, hash){
			if(err){return next(err);}
			// overwrite plain text password with encrypted password
			landlord.password = hash;
			// go ahead and save the model (since this is on a pre-save hook)
			next();
		});
	});
});

// we can define for our schema any methods we would like the User class to have access to
// in this case, we add a comparePassword() for quickly comparing passwords + salt
landlordSchema.methods.comparePassword = function(candidatePassword, callback){
	// use bcrypt to compare the incoming candidate password+salt vs this.password (which is already salted)
	// `this` refers to the caller of this function, which would be that landlord object
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){return callback(err);}
		// isMatch will be true or false according to the comparison results
		callback(null, isMatch);
	});
}


// Create the model class
// we tell mongoose that the landlordSchema correlates to the mongo collection called 'landlord'
const ModelClass = mongoose.model('Landlord', landlordSchema);

// Export the model
module.exports = ModelClass;
