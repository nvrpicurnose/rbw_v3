import axios from 'axios'

const API_URL = "http://localhost:3090"

export function getSubletsFromDB(city){
	const p = new Promise((res, rej)=>{
		console.log(city)
		axios.post(API_URL+"/get_sublets", {city})
			.then((sublets)=>{	
				console.log(sublets)
				res(sublets.data)
			})
	})
	return p
}

export function getLeasesFromDB(city){
	const p = new Promise((res, rej)=>{
		console.log(city)
		axios.post(API_URL+"/get_leases", {city})
			.then((leases)=>{
				console.log(leases)
				res(leases.data)
			})
	})
	return p
}