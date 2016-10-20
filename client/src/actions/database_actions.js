import { GET_SUBLETS_FROM_DB, GET_LEASES_FROM_DB } from './action_types'

export function saveSubletsToRedux(sublets){
	return function(dispatch){
		dispatch({
			type: GET_SUBLETS_FROM_DB,
			payload: sublets
		})
	}
}

export function saveLeasesToRedux(leases){
	return function(dispatch){
		dispatch({
			type: GET_LEASES_FROM_DB,
			payload: leases
		})
	}
}