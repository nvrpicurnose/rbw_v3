import { AUTH_LANDLORD, UNAUTH_LANDLORD, AUTH_ERROR, FETCH_MESSAGE } from '../actions/action_types';

const INITIAL_STATE = {
	authenticated: false,
	error: null,
	message: null
}

export default function(state = {}, action){
	switch(action.type){
		case AUTH_LANDLORD:
			return {...state, authenticated: true};
		case UNAUTH_LANDLORD:
			return {...state, authenticated: false};
		case AUTH_ERROR:
			return  {...state, error: action.payload};
		case FETCH_MESSAGE:
			return {...state, message: action.payload}
	}
	return state;
} 

