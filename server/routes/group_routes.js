const mongoose = require('mongoose');
const async = require('async');

const Group = require('../models/group_model');


// GET /city_groups
exports.city_groups = function(req, res, next){
	const city_name = req.body.city
	console.log("==========================")
	console.log(city_name)
	Group.find({$and: [{city_name: city_name}, {active: true}]}, function(err, groups){
		if(err){console.log(err)};
		// return the matching groups
		if(groups.length > 0){
			res.json(groups)
		}else{
			res.json(null)
		}
	});
}

// GET /rentburrow_group
exports.rentburrow_group = function(req, res, next){
	const city_name = req.body.city_name;

	Group.find({$and: [{city_name: city_name}, {active: true}, {main: true}]}, function(err, group){
		if(err){console.log(err)};
		res.json(group);
	});
}