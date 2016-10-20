const mongoose = require('mongoose');
const async = require('async');

const Sublet = mongoose.model('Sublet');

// ==================================
const fb_courier = require("../api/legacy_apis/fb-courier.js");
const rental_parser = require("../api/legacy_apis/rental-parser.js");
const database_checker = require("../api/legacy_apis/database-checker.js");
const native_news = require("../api/legacy_apis/native-news.js");
// ==================================

const subletParser = require('../api/subletParser')
const fbExtractor = require('../api/fbExtractor')

// ======================================================================================================

// check the updated_time of the latest sublet
exports.check_latest_sublet = function(req, res, next){
	const groupid = req.body.groupid;

	Sublet.findOne({$and: [{groupid: groupid}, {active: true}]}, null, {sort: {updated_time: -1}}, function(err, sublet){
		if(err){console.log(err)};
		//console.log(sublet);
		// return the latest sublet date
		if(sublet){
			res.json(sublet.updated_time);
		}else{
			// if no posts in db, return an assumed date of Sept 1, 2016
			const emptydb = new Date("2016-09-01");
			res.json(emptydb);
		}
	});
}

// ======================================================================================================

// parse and save new posts (received from clients)
exports.new_sublets = function(req, res, next){
	const newSublets = req.body.newSublets
	const tenant = req.body.profile
	
	fbExtractor.setFacebookToken(tenant.accessToken)
	subletParser.parseAndSaveSublets(newSublets)
	res.send("Thanks for helping populate the database!");
}

// ======================================================================================================

// return last 200 active posts
exports.get_sublets = function(req, res, next){
	const city_name = req.body.city
	const City = city_name.slice(0,1).toUpperCase() + city_name.slice(1)		// capitalize city
	// use our modules to process logic
	// return to client the last 150 posts in db
	Sublet.find({$and:[{city: City}, {active: true}]}, null, {sort: {updated_time: -1}}, function(err, posts){
		if(err){return next(err)}
		res.json(posts)
	}).limit(200)
}


// ======================================================================================================

// for saving a new sublet that was created natively in webapp
exports.native_new_sublet = function(req, res, next){
	const preview = req.body;
	console.log(preview);

	native_news.parseAndSaveNativePost(preview)
		.then(function(data){
			res.json(data);
		}, function(err){
			console.log(err);
		});
}


// ======================================================================================================

