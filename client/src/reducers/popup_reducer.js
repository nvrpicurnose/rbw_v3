import { TOGGLE_LEASE_POPUP_TRUE, TOGGLE_SUBLET_POPUP_TRUE, TOGGLE_POPUP_FALSE, TOGGLE_CONTACT_FORM, IMAGE_POPUP, CLEAR_IMAGE_POPUP } from '../actions/action_types'

const INITIAL_STATE = {
	leaseForPopup: null,
	subletForPopup: null,
	toggle: null,
	contact: null,
	imgForPopup: null
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case TOGGLE_SUBLET_POPUP_TRUE:
			return {
				...state,
				subletForPopup: action.payload,
				toggle: TOGGLE_SUBLET_POPUP_TRUE
			}
		case TOGGLE_LEASE_POPUP_TRUE:
			return {
				...state,
				leaseForPopup: action.payload,
				toggle: TOGGLE_LEASE_POPUP_TRUE
			}
		case TOGGLE_POPUP_FALSE:
			return {
				...state,
				subletForPopup: null,
				leaseForPopup: null,
				toggle: null,
				contact: null
			}
		case TOGGLE_CONTACT_FORM:
			return {
				...state,
				contact: true
			}
		case IMAGE_POPUP:
			return {
				...state,
				imgForPopup: action.payload
			}
		case CLEAR_IMAGE_POPUP:
			return {
				...state,
				imgForPopup: null
			}	
	}
	return state;
}
