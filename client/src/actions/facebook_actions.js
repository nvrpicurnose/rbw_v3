import { SET_FB_PROFILE } from './action_types';

export function setFBProfile(profile){
	return function(dispatch){
		dispatch({
			type: SET_FB_PROFILE,
			payload: profile
		})
	}
}