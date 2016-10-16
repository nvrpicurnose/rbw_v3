const mongoose = require('mongoose');
const async = require('async');
const watchlist_populator = require("../api/legacy_apis/watchlist-populator.js");

const Sublet = require('../models/sublet_model');
const Lease = require('../models/lease_model');
const Watchlist = require('../models/watchlist_model');

// create an ObjectId class from mongo
const ObjectId = mongoose.Types.ObjectId;


// ======================================================================================================

// get relevant watchlists
exports.my_watchlists = function(req, res, next){
	const userid = req.body.userid;
	//console.log(userid);

	// check userid against all watchlists' watchers and return all matching
	Watchlist.find({"users":{"$in": [userid]}}).exec(function(err, watchlists){
		//console.log(watchlists);
		res.json(watchlists);
	});
}

// get a specific watchlist
exports.watchlist = function(req, res, next){
	const watchlist_id = req.body.watchlist_id;
	//console.log(watchlist_id);

	// return the watchlist
	Watchlist.findOne({"_id": new ObjectId(watchlist_id)}).exec(function(err, watchlist){
		res.json(watchlist);
	});
}


// ======================================================================================================


// create a watchlist
exports.new_watchlist = function(req, res, next){
	console.log(req.body);
	const new_watchlist = {
		watchlist_title: req.body.watchlist_title,
		users: [req.body.userid],
		properties: [],
		updated_at: new Date(),
		active: true
	};
	//console.log(new_watchlist);

	const watchlist = new Watchlist(new_watchlist);

	watchlist.save(function(err, watchlist){
		if(err){return next(err)}
		console.log("saving new watchlist:");
		//console.log(watchlist);
		return res.json(watchlist);
	});
}

// add self to a watchlist
exports.add_watchlist_user = function(req, res, next){
	const watchlist_id = req.body.watchlist_id;
	const userid = req.body.userid;
	//console.log(req.body);

	Watchlist.findOneAndUpdate({ _id: watchlist_id }, { $addToSet: { users : userid } }, { safe: true }).exec(function(err, watchlist) {
		res.json("Added user to this watchlist!");
	});
}

// remove self from a watchlist
exports.remove_watchlist_user = function(req, res, next){
	const watchlist_id = req.body.watchlist_id;
	const userid = req.body.userid;
	//console.log(req.body);

	Watchlist.update({ _id: watchlist_id }, { $pull: { users : userid } }, { safe: true }).exec(function(err, watchlist) {
		res.json("Removed user from this watchlist!");
	});
}


// ======================================================================================================


// add property to a watchlist
exports.add_watchlist_prop = function(req, res, next){
	const watchlist_id = req.body.watchlist_id;
	const postid = req.body.postid;
	const type = req.body.type;
	//console.log(req.body);

	if(type=='sublets'){
		Watchlist.findOneAndUpdate({ _id: watchlist_id }, { $addToSet: { sublets : postid } }, { safe: true }).exec(function(err, watchlist) {
			res.json("Added property to this watchlist!");
		});
	}else if(type=='leases'){
		Watchlist.findOneAndUpdate({ _id: watchlist_id }, { $addToSet: { leases : postid } }, { safe: true }).exec(function(err, watchlist) {
			res.json("Added property to this watchlist!");
		});
	}
}

// remove property from a watchlist
exports.remove_watchlist_prop = function(req, res, next){
	const watchlist_id = req.body.watchlist_id;
	const postid = req.body.postid;
	const type = req.body.type;
	//console.log(req.body);

	if(type=='sublets'){
		Watchlist.findOneAndUpdate({ _id: watchlist_id }, { $pull: { sublets : postid } }, { safe: true }).exec(function(err, watchlist) {
			res.json("Removed property from this watchlist!");
		});
	}else if(type=='leases'){
		Watchlist.findOneAndUpdate({ _id: watchlist_id }, { $pull: { leases : postid } }, { safe: true }).exec(function(err, watchlist) {
			res.json("Removed property from this watchlist!");
		});
	}
}

// populate a watchlists properties
exports.populate_watchlist = function(req, res, next){
	const data = req.body
	//console.log(data);

   	// syncronously execute in this order
	async.waterfall([
		async.apply(watchlist_populator.populate_sublets, data),	// async.apply(fn, param) to implicitly pass params to first function
	  	watchlist_populator.populate_leases
	], function(err, data){
		//console.log(data);
		res.json(data);
	});
}

