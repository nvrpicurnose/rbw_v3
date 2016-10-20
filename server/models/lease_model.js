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

// ===================================

const mockLeases = [
		{
			_id: "3tsfgdgj98023424",
			building_name: "330 Spruce St",
			address: "330 Spruce St, Waterloo ON",
			city_name: "Waterloo",
			company: "Domus Student Housing",
			type: "Low-rise",
			rooms: [{
				room_type: "Floor 1", 
				reg_price: 600, 
				promo_price: 560,
				rooms_per: 5, 
				lease_terms: 12, 
				promo_terms: 12,
				bathrooms: 5,
				note: "Well rounded student housing",
				promo: true
			},
			{
				room_type: "Floor 2-6", 
				reg_price: 625, 
				promo_price: 560,
				rooms_per: 5, 
				lease_terms: 12, 
				promo_terms: 12,
				bathrooms: 5,
				note: "Well rounded student housing",
				promo: true
			},
			{
				room_type: "Penthouse", 
				reg_price: 700, 
				promo_price: 650,
				rooms_per: 5, 
				lease_terms: 12, 
				promo_terms: 12,
				bathrooms: 5,
				note: "Well rounded student housing",
				promo: true
			}],
			utils_list: {
				water: true,
				heat: true,
				electric: true,
				furnished: true,
				parking: false,
				free_parking: false,
				internet: true,
				ac: true,
				laundry: true
			},
			url: "https://www.domushousing.com/",
			thumbnail: "https://www.domushousing.com/images/domus-logo.png",
			images: [
				"https://www.domushousing.com/primgs/4969",
				"https://www.domushousing.com/primgs/3727",
				"https://www.domushousing.com/primgs/3725",
				"https://www.domushousing.com/primgs/3724",
				"https://www.domushousing.com/primgs/3749",
				"https://www.domushousing.com/primgs/3729",
				"https://www.domushousing.com/primgs/3728",
				"https://www.domushousing.com/primgs/3965"
			],
			coords: [-80.526854, 43.479983],
			contacts: [{
				name: "Ann Wylder", 
				email: "Ann.Wylder@domus.com", 
				phone: "519-345-2345"
			}],
			note: "Near UW and WLU. Close to food and bus stops.",
			active: true,
			status: "Online",
			created_at: new Date()
		},
		{
			_id: "sdfgh57esgsdfgh",
			building_name: "74 Churchill St",
			address: "74 Churchill St, Waterloo ON",
			city_name: "Waterloo",
			company: "Domus Student Housing",
			type: "House",
			rooms: [{
				room_type: "Main Floor", 
				reg_price: 450, 
				promo_price: 420,
				rooms_per: 5, 
				lease_terms: 12, 
				promo_terms: 12,
				bathrooms: 2,
				note: "Well rounded student housing",
				promo: true
			},
			{
				room_type: "Basement", 
				reg_price: 430, 
				promo_price: 400,
				rooms_per: 5, 
				lease_terms: 12, 
				promo_terms: 12,
				bathrooms: 2,
				note: "Well rounded student housing",
				promo: true
			}],
			utils_list: {
				water: true,
				heat: true,
				electric: true,
				furnished: true,
				parking: false,
				free_parking: false,
				internet: true,
				ac: true,
				laundry: true
			},
			url: "https://www.domushousing.com/",
			thumbnail: "https://www.domushousing.com/images/domus-logo.png",
			images: [
				"https://www.domushousing.com/primgs/4607",
				"https://www.domushousing.com/primgs/4608",
				"https://www.domushousing.com/primgs/4609",
				"https://www.domushousing.com/primgs/4610",
				"https://www.domushousing.com/primgs/4615",
				"https://www.domushousing.com/primgs/4614",
				"https://www.domushousing.com/primgs/4617"
			],
			coords: [-80.549483, 43.455234],
			contacts: [{
				name: "Ann Wylder", 
				email: "Ann.Wylder@domus.com", 
				phone: "519-345-2345"
			}],
			note: "Near UW and WLU. Close to food and bus stops.",
			active: true,
			status: "Online",
			created_at: new Date()
		},
		{
			_id: "sdfg35egfhtujuyffds",
			building_name: "The Lester Ensuites",
			address: "295 Lester St, Waterloo ON",
			city_name: "Waterloo",
			company: "Domus Student Housing",
			type: "Apartment",
			rooms: [{
				room_type: "Standard", 
				reg_price: 450, 
				promo_price: 400, 
				rooms_per: 5, 
				lease_terms: 12, 
				promo_terms: 12,
				bathrooms: 5,
				note: "Well rounded student housing",
				promo: false
			}],
			utils_list: {
				water: true,
				heat: true,
				electric: true,
				furnished: true,
				parking: false,
				free_parking: false,
				internet: true,
				ac: true,
				laundry: true
			},
			url: "https://www.domushousing.com/",
			thumbnail: "https://www.domushousing.com/images/domus-logo.png",
			images: [
				"https://www.domushousing.com/primgs/4161",
				"https://www.domushousing.com/primgs/4149",
				"https://www.domushousing.com/primgs/4163",
				"https://www.domushousing.com/primgs/4147",
				"https://www.domushousing.com/primgs/4162",
				"https://www.domushousing.com/primgs/4166",
				"https://www.domushousing.com/primgs/4167"
			],
			coords: [-80.536395, 43.475468],
			contacts: [{
				name: "Ann Wylder", 
				email: "Ann.Wylder@domus.com", 
				phone: "519-345-2345"
			}],
			note: "Near UW and WLU. Close to food and bus stops.",
			active: true,
			status: "Online",
			created_at: new Date()
		}
	]


Lease.find({building_name: "330 Spruce St"}, function(err, leases){
	if(err){console.log(err)};

	if(leases.length == 0){
		for(var g=0; g<mockLeases.length; g++){
			var newLease = new Lease({
				building_name: mockLeases[g].building_name,
				address: mockLeases[g].address,
				city_name: mockLeases[g].city_name,
				company: mockLeases[g].company,
				type: mockLeases[g].type,
				rooms: mockLeases[g].rooms,
				utils_list: mockLeases[g].utils_list,
				url: mockLeases[g].url,
				thumbnail: mockLeases[g].thumbnail,
				images: mockLeases[g].images,
				coords: mockLeases[g].coords,
				contacts: mockLeases[g].contacts,
				note: mockLeases[g].note,
				active: mockLeases[g].active,
				status: mockLeases[g].status,
			})
			newLease.save(function(err){
				if(err) throw err;
				console.log('Adding mock lease');
			});
		}
	}
});

