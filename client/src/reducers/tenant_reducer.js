import { SET_TENANT, SET_CITY, SET_FB_PROFILE } from '../actions/action_types'
import {mockTenantState} from '../mock/landlord_state'

const INITIAL_STATE = {
	tenant: mockTenantState.tenant,			// the tenant data
	city: mockTenantState.city,			// all the properties owned by this tenant
	fbUser: null
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case SET_TENANT:
			return {
				...state,
				tenant: action.payload
			}
		case SET_CITY:
			return {
				...state,
				city: action.payload
			}
		case SET_FB_PROFILE:
			return {
				...state,
				fbUser: action.payload
			}
	}
	return state;
}
