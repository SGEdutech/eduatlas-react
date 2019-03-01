import axios from 'axios';
import { schemeAndAuthority, tuitionId } from '../../config.json';

export function addRequest(newRequest) {
	return dispatch => {
		dispatch({
			type: 'ADD_REQUEST',
			payload: axios.post(`${schemeAndAuthority}/tuition/${tuitionId}/request`, newRequest)
		});
	};
}

export function deleteRequest(reqId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_REQUEST',
			payload: axios.delete(`${schemeAndAuthority}/tuition/${tuitionId}/request/${reqId}`)
		});
	};
}
