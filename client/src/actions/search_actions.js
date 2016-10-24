import { SAVE_SUBLET_SEARCH_PARAMS, SAVE_LEASE_SEARCH_PARAMS } from './action_types'

export function nextSubletSearchState(params){
	return function(dispatch){
		dispatch({
			type: SAVE_SUBLET_SEARCH_PARAMS,
			payload: params
		})
	}
}

export function nextLeaseSearchState(params){
	return function(dispatch){
		dispatch({
			type: SAVE_LEASE_SEARCH_PARAMS,
			payload: params
		})
	}
}