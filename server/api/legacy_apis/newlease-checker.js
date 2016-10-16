// declare dependencies
var mongoose = require('mongoose');
var async = require('async');
var Q = require('q');

var Lease = mongoose.model('Lease');

var exports = module.exports = {};

exports.check_lease = function(lease){
	var self = this;
	var deferred = Q.defer();
	//console.log(lease);
   	// syncronously execute in this order
	async.waterfall([
	  	async.apply(checkRequiredKeys, lease),	// async.apply(fn, param) to implicitly pass params to first function
	  	checkKeyTypes,
	  	checkDeeper,
	  	checkSecurityKey
	], function(err, refined_lease){
		if(err){console.log(err)};
		console.log(refined_lease);
		if(typeof refined_lease == 'undefined'){
			console.log("Rejecting undefined lease.");
			deferred.reject(err);
		}else{
			var lease = new Lease(refined_lease);
			lease.save(function(err, lease){
				if(err){console.log(err)}
				console.log("saving this new lease:");
				console.log(lease);
				deferred.resolve(lease);
			});
		}
	});
	return deferred.promise;
}

checkRequiredKeys = function(data, callback){
	var model_lease_keys = Object.keys(model_lease);
	for(var j = 0; j<model_lease_keys.length; j++){
		if(typeof data[model_lease_keys[j]] === 'undefined'){
			callback("Failed, missing key: " + model_lease_keys[j]);
		}
	}
	callback(null, data);
}

checkKeyTypes = function(data, callback){	// implicit params callback(null, data) --> function(data, callback){}
	//console.log(data);

	var lease_keys = Object.keys(data); // puts all the enumerable keys of this object into an array of key names
	//console.log(lease_keys); 

	for(var i = 0; i<lease_keys.length; i++){
		var equivalent_key = model_lease[lease_keys[i]];
		if(typeof data[lease_keys[i]] === typeof equivalent_key){
			console.log("Yes, the key '" + lease_keys[i] + "' of type '" + typeof data[lease_keys[i]] + "' has an equivalent model key of type: '" +  typeof equivalent_key + "'");
			continue;
		}else{
			callback("Failed, incorrect property type of:'" + typeof data[lease_keys[i]] + "' for key: '" +  lease_keys[i] + "'. It should be: " +  typeof equivalent_key);
		}
	}

    callback(null, data);		// pass on the data object, and null to report no errors
}

// checking for room object and contact object inside their respective arrays
checkDeeper = function(data, callback){
	if(data.rooms[0] && data.contacts[0]){
		if(!data.rooms[0].room_type || !data.rooms[0].reg_price || !data.rooms[0].rooms_per || !data.rooms[0].lease_terms || !data.rooms[0].bathrooms ){
			callback("Missing a room detail! Do u have the room_type, reg_price, rooms_per, lease_terms and bathrooms?");
		}
		if(!data.contacts[0].name || !data.contacts[0].email){
			callback("Missing a contact name or email!");
		}

	}else if(!data.rooms[0]){
		callback("Missing room information!");
	}else if(!data.contacts[0]){
		callback("Missing contact information!");
	}
	callback(null, data);
}

checkSecurityKey = function(data, callback){
	// check that there is a correct security key
	callback(null, data);
}



var model_lease = {
		building_name: "String",
		address: "String",
		city_name: "String",
		company: "String",
		type: "String",
		rooms: [{
			room_type: "String", 
			reg_price: 2, 
			rooms_per: 2, 
			lease_terms: 2, 
			bathrooms: 2,
			note: "String"
		}],
		promos: [{
			room_type: "String", 
			reg_price: 2, 
			sale_price: 2, 
			rooms_per: 2, 
			lease_terms: 2, 
			bathrooms: 2,
			note: "String"
		}],
		utils_list: {
			water: true,
			heat: true,
			electric: true,
			furnished: true,
			parking: true,
			free_parking: true,
			internet: true,
			ac: true,
			laundry: true
		},
		url: "String",
		thumbnail: "String",
		images: ["one", "two"],
		coords: [1,2],
		contacts: [{
			name: "String", 
			email: "String", 
			phone: 2
		}],
		notes: [""],
		active: true,
		status: "String",
		salesperson_id: "String"
	};