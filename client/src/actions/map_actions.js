import axios from 'axios';
import { SELECT_PINS, BACK_TO_PINS } from './action_types';

const API_URL = 'http://localhost:3090';

export function selectPinsFromHere(pins){
	// using redux-thunk to allow for actions with functions
	return function(dispatch){
		dispatch({
			type: SELECT_PINS,
			payload: pins
		})
	}
} 

export function backToPins(){
	return function(dispatch){
		dispatch({
			type: BACK_TO_PINS
		})
	}
}