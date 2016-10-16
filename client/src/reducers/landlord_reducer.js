import { GET_INITIAL_LANDLORD, LOAD_LANDLORD_PROPERTIES, SELECT_LANDLORD_PROPERTY, EDIT_LANDLORD_PROPERTY, DELETE_LANDLORD_PROPERTY } from '../actions/action_types'
import {mockLandlordState} from '../mock/landlord_state'

const INITIAL_STATE = {
	landlord: mockLandlordState.landlord,			// the landlord data
	properties: mockLandlordState.properties,			// all the properties owned by this landlord
	selectedProperty: {}	// detailed view of a specific property (for view or edit)
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case GET_INITIAL_LANDLORD:
			return state
		case LOAD_LANDLORD_PROPERTIES:
			return state
		case SELECT_LANDLORD_PROPERTY:
			return state
		case EDIT_LANDLORD_PROPERTY:
			return state
		case DELETE_LANDLORD_PROPERTY:
			return state
	}
	return state;
}
