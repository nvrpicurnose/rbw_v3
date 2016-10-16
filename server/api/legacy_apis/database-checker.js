// declare dependencies
var mongoose = require('mongoose');
var rental_parser = require("./rental-parser.js");
var async = require('async');

var exports = module.exports = {};

// check each post in newPostFeed and parse it!
exports.checkFeed = function(newPostFeed) {
	var self = this;
	// load up all the posts to execute one at a time
	// asyncronously execute a function on each post in the feed
	async.eachSeries(newPostFeed, self.check_post, function(){
	    console.log("finished looping through the newPosts feed!");
	    return true;
	});
};

// async chain for one post at a time
exports.check_post = function(onePost, callback){
	//console.log(onePost);
	// async chain: /new_posts > database_checker > rental_parser > rental_extractor > rental_parser > database
	rental_parser.parseAndSavePost(onePost)
		.then(function(){
			// to finish this loop iteration
			callback();
		}, function(err){
			// to finish this loop iteration
			callback();
		});
};
