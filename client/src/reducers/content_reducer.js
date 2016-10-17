import { DROP_PINS, SELECT_PINS, BACK_TO_PINS, SET_VIEWMODE, LOAD_FOR_VIEWMODE, LOAD_SUBLETS, LOAD_LEASES, LOAD_BOTH } from '../actions/action_types'
import {mockLandlordState, mockSublets} from '../mock/landlord_state'

const INITIAL_STATE = {
	sublets: mockSublets.sublets,			// all sublets
	leases: mockLandlordState.properties,					// all leases
	listOfResults: null,								// list of properties to show, depending on viewMode (sublet, leases, both)
	filteredResults: null,							// filtered list derived from listOfResults
	filteredPins: null,								// google map pins matching the filteredResults or listOfResults (in that order of priority)
	selectedPins: null,								// when a pin is selected, show this array of matching locations
	viewMode: "sublet"				// options include = ["sublet", "lease", "both"]
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case LOAD_SUBLETS:
			return state
		case LOAD_LEASES:
			return state
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
				viewMode: action.payload
			}
		case LOAD_FOR_VIEWMODE:
			return {
				...state,
				listOfResults: action.payload
			}
	}
	return state;
}
