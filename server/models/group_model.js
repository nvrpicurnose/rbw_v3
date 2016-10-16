// Import dependencies on Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Rental post Schema
var GroupSchema = new mongoose.Schema({
	groupid: String,
	groupname: String,
	city_name: String,
	main: Boolean,
	active: Boolean,
	added_at: Date
});

GroupSchema.pre('save', function(next){
	var currentDate = new Date();

	this.added_at = currentDate;
	next();
});

var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;

// ========= AUTO INSERT ======== //

var autoGroups = [
	{
		groupid: 1591404561120090,
		groupname: "RentBurrow Sublets",
		city_name: "Waterloo",
		active: true,
		main: true
	},
	{
		groupid: 142679255268,
		groupname: "UW/WLU 4 Month Subletting",
		city_name: "Waterloo",
		active: true,
		main: false
	},
	{
		groupid: 110354088989367,
		groupname: "Student Housing in Waterloo",
		city_name: "Waterloo",
		active: true,
		main: false
	},
	{
		groupid: 198200603621455,
		groupname: "Housing",
		city_name: "Waterloo",
		active: true,
		main: false
	},
	{
		groupid: 1572498759686621,
		groupname: "Western University (UWO) - Off-Campus Housing",
		city_name: "London",
		active: true,
		main: true
	},
	{
		groupid: 140018679520133,
		groupname: "McMaster Student Housing Postboard",
		city_name: "Hamilton",
		active: true,
		main: true
	},
	{
		groupid: 370115193161790,
		groupname: "University of Toronto - Off-Campus Housing (St. George)",
		city_name: "Toronto",
		active: true,
		main: true
	},
	{
		groupid: 542272205912816,
		groupname: "University of Toronto (UTSC) - Off-Campus Housing (Scarborough)",
		city_name: "Scarborough",
		active: true,
		main: true
	},
	{
		groupid: 435084536664813,
		groupname: "University of Toronto (UTM) - Off-Campus Housing (Mississauga)",
		city_name: "Mississauga",
		active: true,
		main: true
	}/*,
	{
		groupid: 524220117678841,
		groupname: "Carleton U/ uOttawa/ Algonquin C off-Campus Housing",
		city_name: "Ottawa",
		active: true,
		main: true
	}*/
	// Closed Groups to be added
	// https://www.facebook.com/groups/Queenshousing/
];


Group.find({groupid: 1591404561120090}, function(err, groups){
	if(err){console.log(err)};

	if(groups.length == 0){
		for(var g=0; g<autoGroups.length; g++){
			var newGroup = new Group({
				groupid: autoGroups[g].groupid,
				groupname: autoGroups[g].groupname,
				city_name: autoGroups[g].city_name,
				active: autoGroups[g].active,
				main: autoGroups[g].main
			});
			newGroup.save(function(err){
				if(err) throw err;
				console.log('Adding default group');
			});
		}
	}
});

