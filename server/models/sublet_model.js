// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Rental post Schema
var SubletSchema = new mongoose.Schema({
	id: String,
	posturl: String,
	address: String,
	city: String,
	coords: [Number],
	price: Number,
	rooms_left: Number,
	ensuite_incl: Boolean,
	utils_incl: Boolean,
	phone: String,
	female_only: Boolean,
	semester: String,
	message: String,
	updated_time: Date,
	userid: String,
	username: String,
	userurl: String,
	userpic: String,
	extracted_at: Date,
	groupid: String,
	active: Boolean
});

SubletSchema.pre('save', function(next){
	var currentDate = new Date();

	this.extracted_at = currentDate;
	next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
SubletSchema.index({coords: '2dsphere'});

var Sublet = mongoose.model('Sublet', SubletSchema);

module.exports = Sublet;
