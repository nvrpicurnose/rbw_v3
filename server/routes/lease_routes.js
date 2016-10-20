const mongoose = require('mongoose');
const async = require('async');

const Lease = require('../models/lease_model');
const LeaseCheck = require('../api/legacy_apis/newlease-checker.js');

// ======================================================================================================

exports.get_leases = function(req, res, next){
	const city_name = req.body.city
	const City = city_name.slice(0,1).toUpperCase() + city_name.slice(1)

	// find leases with matching cities
	Lease.find({$and: [{city_name: City}, {active: true}]}, function(err, leases){
		if(err){console.log(err)};
		//console.log(leases);
		// return the matching Leases
		if(leases.length > 0){
			res.json(leases);
		}else{
			res.json(null);
		}
	})
}

// ====================================================================================================== //

exports.specific_lease = function(req, res, next){
	const lease_id = req.body.lease_id;
	console.log("We found a lease and his name is " + lease_id);
	// find leases with matching cities
	Lease.find({'_id':lease_id}, function(err, leases){
		if(err){console.log(err)};
		// return the matching Leases
		if(leases){
			res.json(leases);
		}else{
			res.json(null);
		}
	});
}


// ======================================================================================================


exports.submit_new_lease = function(req, res, next){
	const new_lease = req.body;

	LeaseCheck.check_lease(new_lease)
		.then(function(lease){
			let response = {
				status: "Success",
				message: "Successfully added the new lease for " + lease.address,
				lease: lease
			}
			res.json(response);
		}, function(err){
			let response = {
				status: "Failure",
				message: err
			}
			res.json(response);
		})
}
