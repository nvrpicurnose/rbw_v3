import { DROP_PINS, SELECT_PIN } from '../actions/action_types'
import {mockMapviewState, mockLandlordState, mockSublets} from '../mock/landlord_state'

const INITIAL_STATE = {
	pins: mockMapviewState.pins,			// the list of pins to display
	selectedPin: {},
	filteredResults: mockLandlordState.properties.concat(mockSublets.sublets)
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case DROP_PINS:
			return state
		case SELECT_PIN:
			return state
	}
	return state;
}
