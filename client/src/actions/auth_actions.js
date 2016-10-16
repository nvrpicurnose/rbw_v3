import axios from 'axios';
import {browserHistory} from 'react-router';
import { AUTH_LANDLORD, AUTH_ERROR, UNAUTH_LANDLORD, FETCH_MESSAGE } from './action_types';

const API_URL = 'http://localhost:3090';

export function signinLandlord({email, password}){
	console.log("signing in with: ", email, password);

	// using redux-thunk to allow for actions with functions
	return function(dispatch){
		// returned for handleSubmit() from reduxForm 
		axios.post(API_URL+'/signin', {email, password})
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				dispatch({type: AUTH_LANDLORD})
				// and save the JWT token for follow-up requests
				// localStorage is browser storage that is private from other domains/websites
				// localStorage is available at global scope
				localStorage.setItem('token', response.data.token);
				// redirect to route '/feature'
				browserHistory.push('/feature');
			})
			.catch(()=>{
				// if request is bad, show an error to user
				dispatch(authError("Bad Login Info"));
			});
	}
} 

export function signupLandlord({email, password}){
	console.log("Attempting sign up with: ", email, password);

	return function(dispatch){
		axios.post(API_URL+'/signup', {email, password})
			.then(response=>{
				dispatch({type: AUTH_LANDLORD});
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/feature');
			})
			.catch(response=>{
				console.log(response);
				dispatch(authError(response));
			});
	}
}

export function signoutLandlord(){
	// remove the jwt token from localStorage
	localStorage.removeItem('token');
	return {
		type: UNAUTH_LANDLORD
	}
}

// redux-thunk versin of fetchMessage()
export function fetchMessage(){
	return function(dispatch){
		axios.get(API_URL, {
			// we can specify headers in axios like this
			headers: {authorization: localStorage.getItem('token')}
		})
		.then(response=>{
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			})
		});
	}
}

/*
	// redux-promise version of fetchMessage()
	export function fetchMessage(){
		const request = axios.get(API_URL, {
			headers: {authorization: localStorage.getItem('token')}
		});
		return {
			type: FETCH_MESSAGE,
			payload: request
		}
	}
*/

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	}
}