import { LOAD_SUBLETS, LOAD_LEASES } from '../actions/action_types'
import {mockLandlordState, mockSublets} from '../mock/landlord_state'

const INITIAL_STATE = {
	sublets: mockLandlordState.properties,			// the list of pins to display
	leases: mockSublets.sublets,
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case LOAD_SUBLETS:
			return state
		case LOAD_LEASES:
			return state
	}
	return state;
}
