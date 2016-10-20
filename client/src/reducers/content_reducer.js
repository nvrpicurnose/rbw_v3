import { GET_SUBLETS_FROM_DB, GET_LEASES_FROM_DB, DROP_PINS, SELECT_PINS, BACK_TO_PINS, SET_VIEWMODE, LOAD_FOR_VIEWMODE, LOAD_BOTH, STRING_FILTER, PAN_TO } from '../actions/action_types'
import {mockLandlordState, mockSublets} from '../mock/landlord_state'

const INITIAL_STATE = {
	sublets: [],			// all sublets
	leases: [],					// all leases
	listOfResults: null,								// list of properties to show, depending on viewMode (sublet, leases, both)
	filteredResults: null,							// filtered list derived from listOfResults
	selectedPins: null,								// when a pin is selected, show this array of matching locations
	panTo: null, 					// a pin to pan to when a card's map button is clicked
	viewMode: "lease"				// options include = ["sublet", "lease", "both"]
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case GET_SUBLETS_FROM_DB:
			return {
				...state,
				sublets: action.payload
			}
		case GET_LEASES_FROM_DB:
			return {
				...state,
				leases: action.payload
			}
		case DROP_PINS:
			return {
				...state,
				filteredPins: action.payload
			}
		case SELECT_PINS:
			return {
				...state,
				selectedPins: action.payload
			}
		case BACK_TO_PINS: 
			return {
				...state,
				selectedPins: null
			}
		case SET_VIEWMODE:
			return {
				...state,
				filteredResults: null,
				selectedPins: null,
				viewMode: action.payload
			}
		case LOAD_FOR_VIEWMODE:
			return {
				...state,
				listOfResults: action.payload
			}
		case STRING_FILTER:
			return {
				...state,
				filteredResults: action.payload,
				selectedPins: null
			}
		case PAN_TO:
			return {
				...state,
				panTo: action.payload
			}
	}
	return state;
}
