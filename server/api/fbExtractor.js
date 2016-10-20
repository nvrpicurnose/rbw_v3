const FB = require('fb')

module.exports.setFacebookToken = function(accessToken){
	FB.setAccessToken(accessToken)
}

module.exports.extractUser = function(sublet){
	sublet.posturl = "http://facebook.com/"+sublet.postid
	const p = new Promise((res, rej)=>{
		// first get the userid of this post via postid
		const postid_edge = '/' + sublet.postid + '?fields=from'
		FB.api(
		    postid_edge,
		    function (response) {
		      if (response && !response.error) {
	    		sublet.userid = response.from.id
	    		sublet.username = response.from.name
	    		res(sublet)
		      }else{
		      	rej("Could not extract user")
		      }
		    }
		)
	})
	return p
}

module.exports.extractProfileLink = function(sublet){
	const p = new Promise((res, rej)=>{
		// then get the profile link via the userid
		const userid_edge = '/' + sublet.userid + '/?fields=link';
		FB.api(
		    userid_edge,
		    function (response) {
		      if (response && !response.error) {
		        sublet.userurl = response.link;
		        res(sublet)
		      }else{
		      	rej("Could not extract profile link")
		      }
		    }
		)
	})
	return p
}

module.exports.extractProfileImage = function(sublet){
	const p = new Promise((res, rej)=>{
		// then get the profile image url via the userid
		const userid_edge = '/' + sublet.userid + '?fields=picture&type=small';
		FB.api(
		    userid_edge,
		    function (response) {
		      if (response && !response.error) {
		        sublet.userpic = response.picture.data.url
		        res(sublet)
		      }else{
		      	rej("Could not extract profile img")
		      }
		    }
		);
	})
	return p
}
