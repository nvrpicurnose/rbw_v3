// declare dependencies
var mongoose = require('mongoose');
var async = require('async');
var GoogleMapsAPI = require('googlemaps');
var Q = require('q');

var Sublet = mongoose.model('Sublet');

var exports = module.exports = {};

// the refinement process
exports.parseAndSaveNativePost = function(post) {
   	var self = this;
	var deferred = Q.defer();
   	// syncronously execute in this order
	async.waterfall([
	  	async.apply(parseGPS, post),	// async.apply(fn, param) to implicitly pass params to first function
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
				updated_time = new Date();
				// save to db only if we successfully extracted an address, coords, userurl and price 
				if(refined_post.address && refined_post.coords && refined_post.userurl && refined_post.price){
					var post = new Sublet(refined_post);
					post.save(function(err, post){
						if(err){console.log(err)}
						console.log("saving this new post:");
						console.log(post);
						deferred.resolve(post);
					});
				}else{
					deferred.reject();
				}



			// but if our response is not empty, then we must mark the previous posts as inactive before saving new post
			}else{
				Sublet.update({$and: [{userid: refined_post.userid},{coords: refined_post.coords}, {active: true}]}, {active: false}, {multi:true}, function(err, res){
					if(err){return next(err)};

					console.log('setting olds as inactive, saving new post');
					refined_post.active = true;
				updated_time = new Date();
					// save to db only if we successfully extracted an address, coords, userurl and price 
					if(refined_post.address && refined_post.coords && refined_post.userurl && refined_post.price){
						var post = new Sublet(refined_post);
						post.save(function(err, post){
							if(err){console.log(err)}
							console.log("saving this new post:");
							console.log(post);
							deferred.resolve(post);
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

