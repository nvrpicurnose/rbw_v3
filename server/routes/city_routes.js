const mongoose = require('mongoose');
const async = require('async');

const City = require('../models/city_model');


// GET /get_cities
// check the updated_time of the latest post
exports.get_cities = function(req, res, next){
	const province = req.body.province;
	const country = req.body.country;

	//City.find({$and: [{province: province}, {country: country}]}, function(err, cities){
	City.find({country: country}, function(err, cities){
		if(err){console.log(err)};

		if(cities){
			res.json(cities);
		}else{
			res.json("No cities for this province.");
		}
	});
};


// GET /city_data
// get data of this city
exports.city_data = function(req, res, next){
	const city_name = req.body.city_name;

	City.findOne({city_name: city_name}, function(err, city){
		if(err){console.log(err)};

		if(city){
			res.json(city);
		}else{
			res.json("No such city found with name: " + city_name);
		}
	})
}
