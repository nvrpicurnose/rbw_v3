import axios from 'axios'

const API_URL = "http://localhost:3090"

export function grabFBProfile(){
	return grabFacebookProfile()
				.then(grabFacebookImage)
}

export function extractAndSaveFacebookPostsToDB(city, profile){
	getGroupsForCity({city, profile})
		.then(latestPostInServerPerGroup)
		.then(getPostsFromGroups)
		.then(filterNonSublets)
		.then(sendToServer)
}

function getGroupsForCity({city, profile}){
	const p = new Promise((res, rej)=>{
		axios.post(API_URL+"/city_groups", {city})
			.then((response, err)=>{
				if(err){rej(err)}
				res({
					groups: response.data,
					profile
				})
			})
	})
	return p
}

function latestPostInServerPerGroup({groups, profile}){
	const p = new Promise((res, rej)=>{
		const groupsWithLatestPostTime = []
		for(let g = 0; g<groups.length; g++){
			axios.post(API_URL+'/check_latest_sublet', groups[g])
				.then(function(data){
					let lastPostTime
					if(data){
						lastPostTime = data.data
						groupsWithLatestPostTime.push({...groups[g], lastPostTime})
					}
					if(g === groups.length-1){
						res({
							groupsTime: groupsWithLatestPostTime,
							profile
						})
					}
				})
		}
	})
	return p
	
}

function getPostsFromGroups({groupsTime, profile}){
	const p = new Promise((res, rej)=>{
		const postsArray = []
		let doneAsyncTicker = 0
		for(let g = 0; g<groupsTime.length; g++){
			FB.api(
	            "/"+groupsTime[g].groupid+"/feed?limit=10",
	          	function (response) {
		            if (response && !response.error) {
					  	response.data.filter((post)=>{
					  		return post.updated_time > groupsTime[g].lastPostTime
					  	}).forEach((post)=>{
					  		postsArray.push({
					  			...post,
					  			city: groupsTime[g].city_name
					  		})
					  	})
		            }
		            doneAsyncTicker++
				  	if(doneAsyncTicker === groupsTime.length){
						res({
							postsArray,
							profile
						})
					}
		        }
		    )
		}
	})
	return p
}

function filterNonSublets({postsArray, profile}){
	console.log(postsArray)
	const p = new Promise((res, rej)=>{
		const filteredSublets = postsArray.filter((post, index)=>{
			if(post.message){
				return post.message.match(/\(?(\d+[a-fA-F]?)\s(\b[a-zA-Z]*\b)\s(\.|,|\()?([a-zA-Z]*)(\.|,|\:|\)|\n)?\s??(?:[a-zA-Z]*)?(\.|,)?/ig)
			}
		})
		res({
			filteredSublets,
			profile
		})
	})
	return p
}

function sendToServer({filteredSublets, profile}){
	axios.post(API_URL+'/new_sublets', {newSublets: filteredSublets, profile})
		.then(function(data){
			console.log(data);
		}, function(err){
			console.log(err);
		})
}

function grabFacebookProfile(){
	const p = new Promise((res, rej)=>{
		FB.api('/me', function(profile) {
			if(profile){
				res(profile)
			}else{
				rej()
			}
		})
	})
	return p	
}

function grabFacebookImage(profile){
	const p = new Promise((res, rej)=>{
		FB.api(
		    '/me?fields=picture&type=small',
		    function (response) {
		      if (response && !response.error) {
		        const picurl = response.picture.data.url;
		        res({...profile, picurl});
		      }else{
	    		rej()
		      }
		    }
		);
	})
	return p
}