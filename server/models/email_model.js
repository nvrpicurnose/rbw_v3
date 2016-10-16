// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Rental post Schema
var EmailSchema = new mongoose.Schema({
	prop_address: String,
	to: String,
	from_email: String,
	from_name: String,
	from_fb_id: String,
	phone: String,
	contents: String,
	url_link: String,
	sent_at: Date
});

EmailSchema.pre('save', function(next){
	var htmlString = "";

	this.html = htmlString;
	next();
});

var Email = mongoose.model('Email', EmailSchema);

module.exports = Email;