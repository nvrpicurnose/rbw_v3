// declare dependencies
var mongoose = require('mongoose');
var async = require('async');

var wordbank = require("./wordbank.js");
var exports = module.exports = {};

exports.extract_address = function(parsed_addresses, city){
	// check for each in parsed_addresses array
	if(parsed_addresses){
		for(var obj=0; obj<parsed_addresses.length; obj++){
	        // for each record in parsed_addresses, split it by ' ' space
	      	var split_parsed_addresses = parsed_addresses[obj].split(" ");
        
        	// check that split_parsed_addresses actually has a 3rd word
        	if(split_parsed_addresses[2]){
        		// if it does, we will loop through all the street_signs
		        for(var st=0; st<wordbank.street_signs.length; st++){
		        	// match each street_sign with the 3rd word (street word) in our split_parsed_addresses
		        	// eg. 310 King Street N. --> the 3rd word will be the street
		          	if(split_parsed_addresses[2].toLowerCase().replace(/(\W)/g, '')==wordbank.street_signs[st].toLowerCase()){
		          		// check that 'Waterloo' is not already the 4th word
		          		// because if not, we will append 'Waterloo' for working with the Google Places API
		          		if(split_parsed_addresses[3]){
		          			// if the 4th word is Waterloo, return the entire string
		          			if(split_parsed_addresses[3].match(/(Waterloo).?/g)){
		          				return parsed_addresses[obj] + " ON";
		          			}else{
		          			// else if the 4th word is 'for', we take it out and add 'Waterloo, ON'
			          			if(split_parsed_addresses[3].match(/(for)?/g)){
			          				return split_parsed_addresses[0] + ' ' + split_parsed_addresses[1] + ' ' + split_parsed_addresses[2] + " " + city + ', ON';
			          			}else{
			          				// else simply return entire string with 'Waterloo, ON'
		             				return parsed_addresses[obj] + " " + city + ', ON';
			          			}
		          			}
		          		}else{
		          			return parsed_addresses[obj] + " " + city + ', ON';
		          		}
		          	}
		        }
        	}
        	

	        // check each in split_parsed_addresses if they contain popular apartments
	        //for(var pa = 0; pa<split_parsed_addresses.length; pa++){
	        //	if(split_parsed_addresses[pa].match(/(Luxe).?/g)){
	        //		address = '333 King Street N, Waterloo';
	        //	}else if(split_parsed_addresses[pa].match(/(Sage).?/g)){
	        //		address = '8 Hickory St W, Waterloo';
	        //	}
	        //}
	    }
	}
}

exports.extract_females_only = function(parsed_females){
	// if parsed_females has any results we will consider the posting as 'females only'
	if(parsed_females){
		for(var f = 0; f<parsed_females.length; f++){
			// check the first word of our regex results is a words_for_women
			var split_parsed_females = parsed_females[f].split(" ");
			for(var yy = 0; yy<wordbank.words_for_women.length; yy++){
				if(split_parsed_females[0].toLowerCase()==wordbank.words_for_women[yy]){
					return true;
				}
			}
		}
	}
}

exports.extract_price = function(parsed_price){
	// currently takes the first price in array as the posting price
	// refactor to get min price listed out of array
	if(parsed_price){
		// get the first extracted price
		var price = parsed_price[0].slice(1);
		for(var pr = 0; pr<parsed_price.length; pr++){
			// check if each identified price is lower than the first
			if(parsed_price[pr].slice(1)<price && parsed_price[pr].slice(1)>price-150){
				// and if it is, we assume the lower price is the listing price
				price = parsed_price[pr].slice(1);
			}
		}
		return price;
	}
}

exports.extract_rooms_left = function(parsed_rooms_left){
	// loop through each in parsed_rooms_left
	if(parsed_rooms_left){
		for(var rl = 0; rl<parsed_rooms_left.length; rl++){
			// search through loop & exclude any posts with '24/7' 
			if(parsed_rooms_left[rl]!== '24/7'){
				// if not '24/7' then it is assumed to be the rooms_left
				return parsed_rooms_left[rl][0];
			}
		}
	}
}

exports.extract_utils_incl = function(parsed_utils_incl){
	// if any results in parsed_utils_incl, we assume utilities are included
	if(parsed_utils_incl){
		return true;
	}
}

exports.extract_ensuite_incl = function(parsed_ensuite_incl){
	// if any results in parsed_ensuite_incl, we assume it is an ensuite room
	if(parsed_ensuite_incl){
		return true;
	}
}

exports.extract_phone = function(parsed_phone){
	// if any results in parsed_phone, we assume that is the poster's phone #
	if(parsed_phone){
		return parsed_phone[0];
	}
}

exports.extract_pet = function(parsed_pet){
	// if any results in parsed_phone, we assume that is the poster's phone #
	if(parsed_pet){
		return true;
	}
}