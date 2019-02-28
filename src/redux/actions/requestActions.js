import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addRequest(newRequest) {
	return dispatch => {
		dispatch({
			type: 'ADD_REQUEST',
			payload: axios.post(`http://localhost:6868/tuition/${tuitionId}/request`, newRequest)
		});
	};
}

export function deleteRequest(reqId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_REQUEST',
			payload: axios.delete(`http://localhost:6868/tuition/${tuitionId}/request/${reqId}`)
		});
	};
}
