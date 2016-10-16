// declare dependencies
var mongoose = require('mongoose');
var async = require('async');

const Sublet = require('../../models/sublet_model');
const Lease = require('../../models/lease_model');

var exports = module.exports = {};

// get each sublet or lease details for the watchlist
/*exports.populate = function(data) {
   	var self = this;
   	// syncronously execute in this order
	async.waterfall([
	  	async.apply(populate_sublets, data),	// async.apply(fn, param) to implicitly pass params to first function
	  	populate_leases
	], function(err, data){
		console.log(data);
		return data;
	});
};*/

exports.populate_sublets = function(data, callback){	// implicit params async.apply(fn, param) --> function(param, callback){}
	Sublet.find({'_id': {$in: data.sublets}}, function(err, sublets_details){
		data.sublets_details = sublets_details;
		callback(null, data);
	});
}

exports.populate_leases = function(data, callback){	// implicit params callback(null, data) --> function(data, callback){}
	Lease.find({'_id': {$in: data.leases}}, function(err, leases_details){
		data.leases_details = leases_details;
		callback(null, data);
	});
}
