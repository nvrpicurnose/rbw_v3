import axios from 'axios';
import { DROP_PINS, SELECT_PINS, BACK_TO_PINS, SET_VIEWMODE, LOAD_FOR_VIEWMODE, STRING_FILTER, PAN_TO } from './action_types';

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

export function filterStringSearch(searchString, listofResults){
	return function(dispatch){
		const filteredResults = listofResults.filter((pin)=>{
			if(pin.building_name){
				return pin.building_name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 || pin.address.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
			}else{
				console.log("Searching for address")
				return pin.address.indexOf(searchString) >= 0
			}
		})
		dispatch({
			type: STRING_FILTER,
			payload: filteredResults
		})
	}
}

export function panToMap(card){
	return function(dispatch){
		dispatch({
			type: PAN_TO,
			payload: card
		})
	}
}