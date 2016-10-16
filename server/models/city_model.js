// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Rental post Schema
var CitySchema = new mongoose.Schema({
	city_name: String,
	province: String,
	country: String,
	coords: [Number],
	added_at: Date
});

CitySchema.pre('save', function(next){
	var currentDate = new Date();

	this.added_at = currentDate;
	next();
});

var City = mongoose.model('City', CitySchema);

module.exports = City;

// ========= AUTO INSERT ======== //

var autoCities = [
	{
		city_name: "Waterloo",
		province: "ON",
		country: "Canada",
		coords: [-80.531995, 43.473897]
	},
	{
		city_name: "Hamilton",
		province: "ON",
		country: "Canada",
		coords: [-79.9212567, 43.2578319]
	},
	{
		city_name: "London",
		province: "ON",
		country: "Canada",
		coords: [-81.2767457, 43.0049369]
	},
	{
		city_name: "Mississauga",
		province: "ON",
		country: "Canada",
		coords: [-79.660944, 43.547814]
	},
	{
		city_name: "Scarborough",
		province: "ON",
		country: "Canada",
		coords: [-79.184759, 43.784583]
	},
	{
		city_name: "Toronto",
		province: "ON",
		country: "Canada",
		coords: [-79.395606, 43.662854] 
	}/*,
	{
		city_name: "Ottawa",
		province: "ON",
		country: "Canada",
		coords: [-81.2767457, 43.0049369]
	},
	{
		city_name: "Montreal",
		province: "QC",
		country: "Canada",
		coords: [-81.2767457, 43.0049369]
	},
	{
		city_name: "Quebec",
		province: "QC",
		country: "Canada",
		coords: [-81.2767457, 43.0049369]
	}*/
];


City.find({city_name: "Waterloo"}, function(err, cities){
	if(err){console.log(err)};

	if(cities.length == 0){
		for(var g=0; g<autoCities.length; g++){
			var newcity = new City({
				cityid: autoCities[g].cityid,
				city_name: autoCities[g].city_name,
				province: autoCities[g].province,
				country: autoCities[g].country,
				coords: autoCities[g].coords
			});
			newcity.save(function(err){
				if(err) throw err;
				console.log('Adding default city');
			});
		}
	}
});
