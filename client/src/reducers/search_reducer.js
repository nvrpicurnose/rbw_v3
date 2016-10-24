import { SAVE_SUBLET_SEARCH_PARAMS, SAVE_LEASE_SEARCH_PARAMS } from '../actions/action_types'

const INITIAL_STATE = {
	subletSearchParams: {
			priceFloor: 350,
			priceCeiling: 600,
			rooms: 1,
			utils: false,
			ensuite: false,
			femaleOnly: false,
			semester: null
		},
	leaseSearchParams: {
			priceFloor: 450,
			priceCeiling: 800,
			leaseTerms: 12,
			rooms: 1,
			water: true,
			heat: true,
			electric: true,
			ac: true,
			ensuite: false,
			parking: false,
			furnished: false,
		}
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case SAVE_SUBLET_SEARCH_PARAMS:
			return {
				...state,
				subletSearchParams: action.payload
			}
		case SAVE_LEASE_SEARCH_PARAMS:
			return {
				...state,
				leaseSearchParams: action.payload
			}
	}
	return state;
}
