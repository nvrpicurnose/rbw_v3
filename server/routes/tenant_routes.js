
const fb_courier = require("../api/legacy_apis/fb-courier.js");

// for saving a new user visit into database
exports.save_visit = function(req, res, next){
	const profile = req.body.user_profile;
	// log user in database
	fb_courier.logUserInDB(profile);
	res.json("");
}
