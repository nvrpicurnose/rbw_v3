const passport = require('passport');
const passportService = require('./api/passport');

const Authentication = require('./routes/auth_routes');
const Landlord = require('./routes/landlord_routes');
const Tenant = require('./routes/tenant_routes');
const Sublets = require('./routes/sublet_routes');
const Leases = require('./routes/lease_routes');
const City = require('./routes/city_routes');
const Group = require('./routes/group_routes');
const Watchlist = require('./routes/watchlist_routes');

// router middlewear using passport jwt strategy
// by default, passport will try to create a cookie session, but since we are using jwt we set session to false
// `local` will be for checking email+password on initial login
const requireSignin = passport.authenticate('local', {session: false})
// `jwt` is for all auth after initial login
const requireAuth = passport.authenticate('jwt', {session: false});

// use `requireAuth` or `requireSignin` to wrap routes with auth conditions
module.exports = function(app){
	
	// Auth related routes
	app.get('/', requireAuth, Authentication.authtest);
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	// Tenant related routes
	app.post('/save_visit', Tenant.save_visit);

	// Landlord related routes
	app.post('/get_landlord', Landlord.get_landlord);
	app.post('/edit_landlord', Landlord.edit_landlord);

	// Sublet related routes
	app.post('/get_sublets', Sublets.get_sublets)
	app.post('/check_latest_sublet', Sublets.check_latest_sublet)
	app.post('/new_sublets', Sublets.new_sublets)
	app.post('/native_new_sublet', Sublets.native_new_sublet)

	// Lease related routes
	app.post('/get_leases', Leases.get_leases)
	app.post('/specific_lease', Leases.specific_lease)
	app.post('/submit_new_lease', Leases.submit_new_lease)

	// City related routes
	app.post('/city_data', City.city_data)
	app.get('/get_cities', City.get_cities)

	// Group related routes
	app.post('/city_groups', Group.city_groups)
	app.get('/rentburrow_group', Group.rentburrow_group)

	// Watchlist related routes
	app.post('/my_watchlists', Watchlist.my_watchlists)
	app.post('/watchlist', Watchlist.watchlist)
	app.post('/new_watchlist', Watchlist.new_watchlist)
	app.post('/add_watchlist_user', Watchlist.add_watchlist_user)
	app.post('/remove_watchlist_user', Watchlist.remove_watchlist_user)
	app.post('/add_watchlist_prop', Watchlist.add_watchlist_prop)
	app.post('/remove_watchlist_prop', Watchlist.remove_watchlist_prop)
	app.post('/populate_watchlist', Watchlist.populate_watchlist)
}