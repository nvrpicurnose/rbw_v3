export const mockLandlordState = {
	landlord: {
		_id: "304osflsfj98023424",
		email: "DomusStudentHousing@email.com",
		company_name: "Domus Student Housing",
		company_logo: "https://www.domushousing.com/images/domus-logo.png"
	},
	properties: [
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
}

export const mockMapviewState = {
	pins: [
		[-80.526854, 43.479983],
		[-80.536395, 43.475468],
		[-80.549483, 43.455234]
	]
}

export const mockSublets= {
	sublets: [
		{
			_id: "3453263634",
			posturl: "http://facebook.com",
			address: "330 Spruce St, Waterloo ON",
			city: "Waterloo",
			coords: [-80.526854, 43.479983],
			price: 430,
			rooms_left: 3,
			ensuite_incl: false,
			utils_incl: true,
			phone: "519-556-8656",
			female_only: false,
			pet: false,
			message: "Looking for a sublet for Winter term...",
			updated_time: new Date(),
			userid: "2adga3423sg42",
			username: "Jake Malliros",
			userurl: "http://facebook.com",
			userpic: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/12074696_10153251704950897_6824617261621903460_n.jpg?oh=4c12639d49eea0e6ed55d1fd2c6a6fdb&oe=586AF871",
			extracted_at: new Date(),
			groupid: "345egfsdgg5",
			active: true
		},
		{
			_id: "34dfsg343634",
			posturl: "http://facebook.com",
			address: "180 Albert St, Waterloo ON",
			city: "Waterloo",
			coords: [-80.530272, 43.472445],
			price: 480,
			rooms_left: 2,
			ensuite_incl: true,
			utils_incl: false,
			phone: "519-556-8656",
			female_only: false,
			pet: false,
			message: "Looking for a sublet for Winter term...",
			updated_time: new Date(),
			userid: "2adga3423sg42",
			username: "Michelle Liu",
			userurl: "http://facebook.com",
			userpic: "https://scontent-ort2-1.xx.fbcdn.net/t31.0-8/13640764_10209112724629259_7776434581054210072_o.jpg",
			extracted_at: new Date(),
			groupid: "345egfsdgg5",
			active: true
		},
		{
			_id: "3asdfg4fg634",
			posturl: "http://facebook.com",
			address: "202 Lester St, Waterloo ON",
			city: "Waterloo",
			coords: [-80.532953, 43.4722],
			price: 500,
			rooms_left: null,
			ensuite_incl: false,
			utils_incl: false,
			phone: "",
			female_only: true,
			pet: false,
			message: "Looking for a sublet for Winter term...",
			updated_time: new Date(),
			userid: "2adga3423sg42",
			username: "Nem Ekpunobi",
			userurl: "http://facebook.com",
			userpic: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/11040882_10153042437611539_3281445262501855604_n.jpg?oh=c180c45daff9f36acd160acf23695812&oe=58664DA5",
			extracted_at: new Date(),
			groupid: "345egfsdgg5",
			active: true
		},
		{
			_id: "34532asgdghs634",
			posturl: "http://facebook.com",
			address: "1 Sunview St, Waterloo ON",
			city: "Waterloo",
			coords: [-80.532866, 43.473302],
			price: 560,
			rooms_left: 1,
			ensuite_incl: true,
			utils_incl: true,
			phone: "",
			female_only: false,
			pet: false,
			message: "Looking for a sublet for Winter term...",
			updated_time: new Date(),
			userid: "2adga3423sg42",
			username: "Param Puri",
			userurl: "http://facebook.com",
			userpic: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/13507060_993548954094756_2616061982249623516_n.jpg?oh=2792e8002c9c095753ec6ab738c2aab5&oe=58A13EAA",
			extracted_at: new Date(),
			groupid: "345egfsdgg5",
			active: true
		},
	]
}