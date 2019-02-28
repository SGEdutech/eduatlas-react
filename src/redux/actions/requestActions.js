import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addRequest(newRequest) {
	return dispatch => {
		dispatch({
			type: 'ADD_REQUEST',
			payload: axios.post(`https://eduatlas.com/tuition/${tuitionId}/request`, newRequest)
		});
	};
}

export function deleteRequest(reqId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_REQUEST',
			payload: axios.delete(`https://eduatlas.com/tuition/${tuitionId}/request/${reqId}`)
		});
	};
}
