const mongoose = require('mongoose');
const async = require('async');

const Sublet = mongoose.model('Sublet');

const fb_courier = require("../api/legacy_apis/fb-courier.js");
const rental_parser = require("../api/legacy_apis/rental-parser.js");
const database_checker = require("../api/legacy_apis/database-checker.js");
const native_news = require("../api/legacy_apis/native-news.js");

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
			// if no posts in db, return an assumed date of Feb 1, 2017
			const emptydb = new Date("2017-02-01");
			res.json(emptydb);
		}
	});
}

// ======================================================================================================

// parse and save new posts (received from clients)
exports.new_sublets = function(req, res, next){
	const newPosts = req.body.newPosts;
	const user_profile = req.body.user_profile;

	// set fb token to use user_profile 
	fb_courier.setFbToken(user_profile);

	// a chain of synchronous functions
	// first checks if the posts exist in db (optional)
	// and parses new posts before saving
	// async chain: /new_posts > database_checker > rental_parser > rental_extractor > rental_parser > database
	
	database_checker.checkFeed(newPosts);

	res.json("parsed and saved new posts!");
}

// ======================================================================================================

// return last 200 active posts
exports.get_sublets = function(req, res, next){
	// console.log(req.body);
	const profile = req.body.profile;
  	const profile_json = JSON.parse(profile);
	profile_json.user_coords = req.body.user_coords;
	const accessToken = req.body.accessToken;
	const city_name = req.body.city_name;
	const City = city_name.slice(0,1).toUpperCase() + city_name.slice(1);		// capitalize city
	// use our modules to process logic

	// return to client the last 150 posts in db
	Sublet.find({$and:[{city: City}, {active: true}]}, null, {sort: {updated_time: -1}}, function(err, posts){
		if(err){return next(err);}
		res.json(posts);
	}).limit(200);
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

