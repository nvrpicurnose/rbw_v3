const GoogleMapsAPI = require('googlemaps')

module.exports.parseGPS = function(sublet){
	const p = new Promise((res, rej)=>{
		const publicConfig = {
		  key: 'AIzaSyAyS_IeE6P7sFMl8Ito_hL2wRjsiw9_lyc',
		  stagger_time:       1000, // for elevationPath
		  encode_polylines:   false,
		  secure:             true // use https
		  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
		}
		const gmAPI = new GoogleMapsAPI(publicConfig);

		// geocode API
		const geocodeParams = {
		  "address":    sublet.address,
		  "components": "components=country:CA"
		}
		
		gmAPI.geocode(geocodeParams, function(err, result){
		  if(err){console.log(err)};
		   //console.log(result);
		  if(result){
		  	if(result.results[0]){
			  	// take the coords of the first result
			  	sublet.coords = [result.results[0].geometry.location.lng, result.results[0].geometry.location.lat];
			  	res(sublet);
			}else{
			  	rej("No geocoding data!");
			}
		  }
		})
	})
	return p
}