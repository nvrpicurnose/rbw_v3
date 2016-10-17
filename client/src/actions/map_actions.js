import axios from 'axios';
import { DROP_PINS, SELECT_PINS, BACK_TO_PINS, SET_VIEWMODE, LOAD_FOR_VIEWMODE } from './action_types';

const API_URL = 'http://localhost:3090';

export function dropPins(pins){
	return function(dispatch){
		dispatch({
			type: DROP_PINS,
			payload: pins
		})
	}
}

export function selectPinsFromHere(pins){
	// using redux-thunk to allow for actions with functions
	return function(dispatch){
		dispatch({
			type: SELECT_PINS,
			payload: pins
		})
	}
} 

export function backToPins(){
	return function(dispatch){
		dispatch({
			type: BACK_TO_PINS
		})
	}
}

export function setViewMode(mode){
	return function(dispatch){
		dispatch({
			type: SET_VIEWMODE,
			payload: mode
		})
		dispatch({
			type: BACK_TO_PINS
		})
	}
}

export function loadForViewMode(list){
	return function(dispatch){
		dispatch({
			type: LOAD_FOR_VIEWMODE,
			payload: list
		})
	}
}