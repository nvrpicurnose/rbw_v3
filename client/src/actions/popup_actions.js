import { TOGGLE_LEASE_POPUP_TRUE, TOGGLE_SUBLET_POPUP_TRUE, TOGGLE_POPUP_FALSE, TOGGLE_CONTACT_FORM, IMAGE_POPUP, CLEAR_IMAGE_POPUP } from './action_types'

export function triggerLeasePopup(lease, contactForm){
	return function(dispatch){
		dispatch({
			type: TOGGLE_LEASE_POPUP_TRUE,
			payload: lease
		})
		if(contactForm){
			dispatch({
				type: TOGGLE_CONTACT_FORM
			})
		}
	}
}

export function triggerSubletPopup(sublet){
	return function(dispatch){
		dispatch({
			type: TOGGLE_SUBLET_POPUP_TRUE,
			payload: sublet
		})
	}
}

export function exitPopup(){
	return function(dispatch){
		dispatch({
			type: TOGGLE_POPUP_FALSE
		})
	}
}


export function popupImage(src){
	return function(dispatch){
		dispatch({
			type: IMAGE_POPUP,
			payload: src
		})
	}
}

export function popupImageExit(){
	return function(dispatch){
		dispatch({
			type: CLEAR_IMAGE_POPUP
		})
	}
}