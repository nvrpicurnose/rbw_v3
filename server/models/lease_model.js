// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Lease = mongoose.Schema;

// Create the Rental post Schema
var LeaseSchema = new mongoose.Schema({
	building_name: String,
	address: String,
	city_name: String,
	company: String,
	type: String,
	rooms: [{
		room_type: String, 
		reg_price: Number, 
		promo_price: Number, 
		rooms_per: Number, 
		lease_terms: Number, 
		promo_terms: Number,
		bathrooms: Number,
		note: String,
		promo: Boolean
	}],
	utils_list: {
		water: Boolean,
		heat: Boolean,
		electric: Boolean,
		furnished: Boolean,
		parking: Boolean,
		free_parking: Boolean,
		internet: Boolean,
		ac: Boolean,
		laundry: Boolean
	},
	url: String,
	thumbnail: String,
	images: [String],
	coords: [Number],
	contacts: [{
		name: String, 
		email: String, 
		phone: String
	}],
	note: String,
	active: Boolean,
	status: String,
	created_at: Date
});

LeaseSchema.pre('save', function(next){
	var currentDate = new Date();

	this.created_at = currentDate;
	next();
});

var Lease = mongoose.model('Lease', LeaseSchema);

module.exports = Lease;
