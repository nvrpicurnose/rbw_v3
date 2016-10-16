// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Rental post Schema
var WatchlistSchema = new mongoose.Schema({
	watchlist_title: String,
	users: [String],
	sublets: [String],
	leases: [String],
	active: Boolean,
	updated_at: Date,
	added_at: Date
});

WatchlistSchema.pre('save', function(next){
	var currentDate = new Date();

	this.added_at = currentDate;
	next();
});

var Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;


// ========= AUTO INSERT ======== //

var autoWatchlists = [
	{
		watchlist_title: "Default Test Watchlist",
		users: [],
		properties: [],
		active: true,
		updated_at: new Date()
	}
];


Watchlist.find({watchlist_title: "Default Test Watchlist"}, function(err, watchlists){
	if(err){console.log(err)};

	if(watchlists.length == 0){
		for(var g=0; g<autoWatchlists.length; g++){
			var newWatchlist = new Watchlist({
				watchlist_title: autoWatchlists[g].watchlist_title,
				users: autoWatchlists[g].users,
				properties: autoWatchlists[g].properties,
				active: autoWatchlists[g].active,
				updated_at: autoWatchlists[g].updated_at
			});
			newWatchlist.save(function(err){
				if(err) throw err;
				console.log('Adding default watchlist');
			});
		}
	}
});

