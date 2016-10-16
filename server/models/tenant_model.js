// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Tenant = mongoose.Schema;

// Create the Rental post Schema
var TenantSchema = new mongoose.Schema({
	id: String,
	name: String,
	city: String,
	coords: [Number],
	accessed_at: Date
});

TenantSchema.pre('save', function(next){
	var currentDate = new Date();

	this.accessed_at = currentDate;
	next();
});

var Tenant = mongoose.model('Tenant', TenantSchema);

module.exports = Tenant;
