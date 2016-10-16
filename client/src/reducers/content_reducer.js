import { LOAD_SUBLETS, LOAD_LEASES, SELECT_PINS, BACK_TO_PINS } from '../actions/action_types'
import {mockLandlordState, mockSublets} from '../mock/landlord_state'

const INITIAL_STATE = {
	sublets: mockLandlordState.properties,			// the list of pins to display
	leases: mockSublets.sublets,
	filteredResults: mockLandlordState.properties.concat(mockSublets.sublets),
	selectedPins: null
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case LOAD_SUBLETS:
			return state
		case LOAD_LEASES:
			return state
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
	}
	return state;
}
