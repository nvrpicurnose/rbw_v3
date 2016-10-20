const keywords = require('./keywords')


module.exports.BeginParsingChain = function(sublet){
	const p = new Promise((res, rej)=>{
		const constructedSublet = {
			postid: sublet.id,
			updated_time: sublet.updated_time,
			message: sublet.message,
			city: sublet.city
		}
		res(constructedSublet)
	})
	return p
}

module.exports.extractAddress = function(sublet){
	const p = new Promise((res, rej)=>{
		let address
		const parsed_addresses = sublet.message.match(/\(?(\d+[a-fA-F]?)\s(\b[a-zA-Z]*\b)\s(\.|,|\()?([a-zA-Z]*)(\.|,|\:|\)|\n)?\s??(?:[a-zA-Z]*)?(\.|,)?/ig);
		
		// check for each in parsed_addresses array
		if(parsed_addresses){
			for(let obj=0; obj<parsed_addresses.length; obj++){
		        // for each record in parsed_addresses, split it by ' ' space
		      	const split_parsed_addresses = parsed_addresses[obj].split(" ");
	        
	        	// check that split_parsed_addresses actually has a 3rd word
	        	if(split_parsed_addresses[2]){
	        		// if it does, we will loop through all the street_signs
			        for(let st=0; st<keywords.street_signs.length; st++){
			        	// match each street_sign with the 3rd word (street word) in our split_parsed_addresses
			        	// eg. 310 King Street N. --> the 3rd word will be the street
			          	if(split_parsed_addresses[2].toLowerCase().replace(/(\W)/g, '')==keywords.street_signs[st].toLowerCase()){
			          		// check that 'Waterloo' is not already the 4th word
			          		// because if not, we will append 'Waterloo' for working with the Google Places API
			          		if(split_parsed_addresses[3]){
			          			// if the 4th word is Waterloo, return the entire string
			          			if(split_parsed_addresses[3].match(/(Waterloo).?/g)){
			          				address = parsed_addresses[obj] + " ON";
			          			}else{
			          			// else if the 4th word is 'for', we take it out and add ', Waterloo ON'
				          			if(split_parsed_addresses[3].match(/(for)?/g)){
				          				address = split_parsed_addresses[0] + ' ' + split_parsed_addresses[1] + ' ' + split_parsed_addresses[2] + ", " + sublet.city + ', ON';
				          			}else{
				          				// else simply return entire string with ', Waterloo ON'
			             				address = parsed_addresses[obj] + ", " + sublet.city + ' ON';
				          			}
			          			}
			          		}else{
			          			address = parsed_addresses[obj] + ", " + sublet.city + ' ON';
			          		}
			          	}
			        }
	        	}
		    }
		}
		if(address){
			address = address.replace(/(\()/g, "")			// and replace any brackets in the address
			address = address.replace(/(\))/g, "")
			sublet.address = address
			res(sublet)
		}else{
			res(sublet)
		}
	})
	return p
}

module.exports.extractFemalesOnly = function(sublet){
	const p = new Promise((res, rej)=>{
		let female_only = false
		const parsed_females = sublet.message.match(/(\w+)\s(only)/ig)

		if(parsed_females){
			for(let f = 0; f<parsed_females.length; f++){
				// check the first word of our regex results is a words_for_women
				const split_parsed_females = parsed_females[f].split(" ");
				for(let yy = 0; yy<keywords.words_for_women.length; yy++){
					if(split_parsed_females[0].toLowerCase()==keywords.words_for_women[yy]){
						female_only = true;
					}
				}
			}
		}
		sublet.female_only = female_only
		res(sublet)
	})
	return p
}

module.exports.extractPrice = function(sublet){
	const p = new Promise((res, rej)=>{
		let price 
		const parsed_price = sublet.message.match(/[$][ ]?[\d]*\b/g)

		if(parsed_price){
			price = parseInt(parsed_price[0].slice(1))
			for(var pr = 0; pr<parsed_price.length; pr++){
				// check if each identified price is lower than the first
				if(parseInt(parsed_price[pr].slice(1))<price && parseInt(parsed_price[pr].slice(1))>price-150){
					// and if it is, we assume the lower price is the listing price
					price = parseInt(parsed_price[pr].slice(1))
				}
			}
		}
		if(price){
			sublet.price = price
			res(sublet)
		}else{
			rej("Did not find a price")
		}
	})
	return p
}

module.exports.extractRoomsLeft = function(sublet){
	const p = new Promise((res, rej)=>{
		let rooms_left
		const parsed_rooms_left = sublet.message.match(/((\d)\/(\d)\s(room))|(\d\s(room))/ig)

		if(parsed_rooms_left){
			for(var rl = 0; rl<parsed_rooms_left.length; rl++){
				// search through loop & exclude any posts with '24/7' 
				if(parsed_rooms_left[rl]!== '24/7'){
					// if not '24/7' then it is assumed to be the rooms_left
					rooms_left = parsed_rooms_left[rl][0];
				}
			}
		}
		sublet.rooms_left = rooms_left
		res(sublet)
	})
	return p
}

module.exports.extractUtilsIncl = function(sublet){
	const p = new Promise((res, rej)=>{
		let utils_incl = false
		let parsed_utils_incl = sublet.message.match(/\b(util)\w+(\s(incl))?/ig)
		if(parsed_utils_incl){
			utils_incl = true;
		}
		sublet.utils_incl = utils_incl
		res(sublet)
	})	
	return p
}

module.exports.extractEnsuite = function(sublet){
	const p = new Promise((res, rej)=>{
		let ensuite_incl = false
		const parsed_ensuite_incl = sublet.message.match(/(en)\s?(suite)/ig)
		if(parsed_ensuite_incl){
			ensuite_incl = true
		}
		sublet.ensuite_incl
		res(sublet)
	})
	return p
}

module.exports.extractPhone = function(sublet){
	const p = new Promise((res, rej)=>{
		let phone
		const parsed_phone = sublet.message.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g)
		if(parsed_phone){
			phone = parsed_phone[0];
		}
		sublet.phone = phone
		res(sublet)
	})
	return p
}

module.exports.extractSemester = function(sublet){
	const p = new Promise((res, rej)=>{
		let semester
		const parsed_semester = sublet.message.match(/(\swinter\s)|(\ssummer\s)|(\sspring\s)|(\sfall\s)/ig)
		if(parsed_semester){
			semester = parsed_semester[0].slice(1, parsed_semester[0].length-1)
		}
		sublet.semester = semester
		res(sublet)
	})
	return p
}