// fb-courier.js

// declare dependencies
var mongoose = require('mongoose');
var async = require('async');

var dateStringParser = require("./datestring-parser.js");
var rentalParser = require("./rental-parser.js");
var database_checker = require("./database-checker.js");

var FB = require('fb');
var Tenant = require('../../models/tenant_model');

// FB.options({version:'v2.7'});


var exports = module.exports = {};
     
// first we log the user to our database   
exports.logTenantInDB = function(profile) {
  	console.log('about to log user in db');
  	console.log(profile);
	var newTenant = {
		id: profile.id,
		name: profile.name,
		coords: profile.user_coords,
		city: profile.city
	};
	var user = new Tenant(newTenant);

	user.save(function(err, saved_user){
		if(err){console.log(err)}
		console.log('======> saved user:');
		console.log(saved_user);
	});
};

exports.setFbToken = function(user_profile){
	// console.log(user_profile);
	FB.setAccessToken(user_profile.accessToken);
	console.log("Set the accessToken!");
}

// then we extract the last 100 posts from facebook until current time
/*exports.extract_feed = function(accessToken) {
	var self = this;
	// set access token for this batch of requests
	FB.setAccessToken(accessToken);

	// get current time as 'YYYY-MM-DD' string
	var now_ = new Date();
	var now = dateStringParser.parseDate_YYYYMMDD(now_);

	// extract the last 200 post since today
	// we can optimize this even more since it uses and throws away quite a bit of bandwidth
	var feed;
	FB.api('/142679255268/feed',
		{ until: now, limit: 100 },
		 function (res) {
		  if(!res || res.error) {
		   console.log(!res ? 'error occurred' : res.error);
		   return;
		  }
		  // console.log(res);
		  feed = res.data;
		  self.check_exists(feed);
		});
}*/
// and for each one of these posts we will check if they are already stored in the database
// those that are not will be saved
/*exports.check_exists = function(feed){
	// console.log(feed);

	database_checker.checkFeed(feed);

}*/