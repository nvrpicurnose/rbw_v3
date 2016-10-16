// declare dependencies
var mongoose = require('mongoose');
var async = require('async');
var FB = require('fb');
var GoogleMapsAPI = require('googlemaps');
var Q = require('q');

var wordbank = require("./wordbank.js");
var rental_extractor = require("./rental-extractor.js");
//var Sublet = mongoose.model('Sublet');
var Sublet = require('../../models/sublet_model');

// load the hint words 
var street_signs = wordbank.street_signs;
var words_for_women = wordbank.words_for_women;

var exports = module.exports = {};

// output of the refinement process
// var refined_post;

// the refinement process
exports.parseAndSavePost = function(post) {
   	var self = this;
	var deferred = Q.defer();
	//console.log(post);
   	// syncronously execute in this order
	async.waterfall([
	  	async.apply(parseMessage, post),	// async.apply(fn, param) to implicitly pass params to first function
	  	extract_user,
	  	extract_profile_link,
	  	extract_profile_image,
	  	parseGPS
	], function(err, refined_post){
		if(err){console.log(err)};

		// reject any dud refined_post
		if(!refined_post || refined_post ==='undefined'){
			return false;
		}

		// check if the post already exists
		Sublet.find({$and: [{userid: refined_post.userid},{coords: refined_post.coords}, {active: true}]}, function(err, res){
			if(err){return next(err)};

			// if our response if empty, that means this post does not yet exist in db
			if(res.length == 0){
				console.log('new post');
				refined_post.active = true;
				// save to db only if we successfully extracted an address, coords, userurl and price 
				if(refined_post.address && refined_post.coords && refined_post.userurl && refined_post.price){
					var post = new Sublet(refined_post);
					post.save(function(err, post){
						if(err){console.log(err)}
						console.log("saving this new post:");
						console.log(post);
						deferred.resolve();
					});
				}else{
					deferred.reject();
				}



			// but if our response is not empty, then we must mark the previous posts as inactive before saving new post
			}else{
				Sublet.update({$and: [{userid: refined_post.userid},{coords: refined_post.coords}, {active: true}]}, {active: false}, {multi:true}, function(err, res){
					if(err){return next(err)};

					console.log('setting olds as inactive..');
					refined_post.active = true;
					// save to db only if we successfully extracted an address, coords, userurl and price 
					if(refined_post.address && refined_post.coords && refined_post.userurl && refined_post.price){
						var post = new Sublet(refined_post);
						post.save(function(err, post){
							if(err){console.log(err)}
							console.log("saving this new post:");
							console.log(post);
							deferred.resolve();
						});
					}else{
						deferred.reject();
					}
				})
			}
		});
		
	});

	return deferred.promise;
};

// parse message using REGEX
parseMessage = function(post, callback){	// implicit params async.apply(fn, param) --> function(param, callback){}
	
	// if the post has a message
	if(post.message){
		console.log(post);
		// set the postid and created_at time
		var postid = post.id;
		var updated_time = post.updated_time;
		var message = post.message;

		// for each post, use regex to find conditional matches and add them into an array

		// parse each post to find an array of possible addresses
		// searches for a 4 letter string starting with digits (aka. house #)
		var parsed_addresses = post.message.match(/\(?(\d+[a-fA-F]?)\s(\b[a-zA-Z]*\b)\s(\.|,|\()?([a-zA-Z]*)(\.|,|\:|\)|\n)?\s??(?:[a-zA-Z]*)?(\.|,)?/ig);
		// parse each post for any word equals 'only'
		// take that word, plus the word before it, and add to array
		var parsed_females = post.message.match(/(\w+)\s(only)/ig);
		// parse each post for $ as hint
		var parsed_price = post.message.match(/[$][ ]?[\d]*\b/g);
		// find rooms_left as any number in fractional format 
		var parsed_rooms_left = post.message.match(/((\d)\/(\d)\s(room))|(\d\s(room))/ig);
		// find any mention of the strings 'util' and 'incl'
		var parsed_utils_incl = post.message.match(/\b(util)\w+(\s(incl))?/ig);
		// find any words with 'ensuite' or 'en suite'
		var parsed_ensuite_incl = post.message.match(/(en)\s?(suite)/ig);
		// parse each post to find strings that indicate a phone number
		var parsed_phone = post.message.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g);
		// parse each post to find if pet friendly
		//var parsed_pet = post.message.match(/(pet)/ig);


		// call the extraction methods on the arrays (array parser)
		var address = rental_extractor.extract_address(parsed_addresses, post.city);
			address = address.replace(/(\()/g, "");			// and replace any brackets in the address
			address = address.replace(/(\))/g, "");
		var female_only = rental_extractor.extract_females_only(parsed_females);
		var price = rental_extractor.extract_price(parsed_price);
		var rooms_left = rental_extractor.extract_rooms_left(parsed_rooms_left);
		var utils_incl = rental_extractor.extract_utils_incl(parsed_utils_incl);
		var ensuite_incl = rental_extractor.extract_ensuite_incl(parsed_ensuite_incl);
		var phone = rental_extractor.extract_phone(parsed_phone);
		//var pet = rental_extractor.extract_pet(parsed_pet);

		// skip this post if there is no address (indicating not a sale post)
		// this is already done once in clientside, done again for certainty on serverside
		if(!address || typeof address === "undefined"){
			callback("No address found. Throwing away post.");
		}else{
			// create the post object that will be saved to db
			var data = {
				address: address,
				city: post.city,
				price: price,
				rooms_left: rooms_left,
				ensuite_incl: ensuite_incl,
				utils_incl: utils_incl,
				// pet: pet,
				phone: phone,
				female_only: female_only,
				message: post.message,
				id: post.id,
				posturl: "http://facebook.com/" + post.id,
				updated_time: updated_time,
				groupid: post.groupid
			};
			//console.log(data);
			callback(null, data);
		}
	}else{
		// throw error if no message content
    	callback("No message content");					// implicit params callback(null, data) --> function(data, callback){}
	}
}

// extract the user id and name
extract_user = function(data, callback){	// implicit params callback(null, data) --> function(data, callback){}
	//console.log(data);

	// first get the userid of this post via postid
	var postid_edge = '/' + data.id + '?fields=from';
	FB.api(
	    postid_edge,
	    function (response) {
	      if (response && !response.error) {
    		userid = response.from.id;
    		username = response.from.name;
    		data.userid = userid;
    		data.username = username;

    		callback(null, data);
	      }
	    }
	);
}

// check if the post already exists (matching address and userid and within last month)
// do this before calling the expensive Google Geocoding API
/*check_post_exists = function(data, callback){
	// check if the post already exists
	Sublet.find({$and: [{userid: data.userid}]}, function(err, res){
		if(err){return next(err);}

		// if our response if empty, that means this post does not yet exist in db
		if(res.length == 0){
			// this part gets executed right away instead of property waiting for waterfall to finish
			// as a result, duplicates are let through
			console.log('new post');
			callback(null, data);
		}else{
			return callback("Sublet already exists");
		}
	});
}*/

// extract the user profile url
extract_profile_link = function(data, callback){
	// then get the profile link via the userid
	var userid_edge = '/' + data.userid + '/?fields=link';
	FB.api(
	    userid_edge,
	    function (response) {
	      if (response && !response.error) {
	        data.userurl = response.link;

    		callback(null, data);
	      }
	    }
	);
}

// extract the profile image url of user
extract_profile_image = function(data, callback){
	// then get the profile image url via the userid
	var userid_edge = '/' + data.userid + '?fields=picture&type=small';
	FB.api(
	    userid_edge,
	    function (response) {
	      if (response && !response.error) {
	      	//console.log(response);
	        data.userpic = response.picture.data.url;
    		callback(null, data);
	      }else{
    		callback(null, data);
	      }
	    }
	);
}

// extract the GPS coords of post address using Google Maps GeoCoding API
parseGPS = function(data, callback){
	var publicConfig = {
	  key: 'AIzaSyAyS_IeE6P7sFMl8Ito_hL2wRjsiw9_lyc',
	  stagger_time:       1000, // for elevationPath
	  encode_polylines:   false,
	  secure:             true // use https
	  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
	};
	var gmAPI = new GoogleMapsAPI(publicConfig);

	// geocode API
	var geocodeParams = {
	  "address":    data.address,
	  "components": "components=country:CA"
	};
	
	gmAPI.geocode(geocodeParams, function(err, result){
	  if(err){console.log(err)};
	   //console.log(result);
	  if(result){
	  	if(result.results[0]){
		  	// take the coords of the first result
		  	data.coords = [result.results[0].geometry.location.lng, result.results[0].geometry.location.lat];
		  	callback(null, data);
		}else{
		  	return callback("No geocoding data!");
		}
	  }
	});
}
