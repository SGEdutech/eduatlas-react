import axios from 'axios';

export function addRequest(newRequest) {
	return dispatch => {
		dispatch({
			type: 'ADD_REQUEST',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/request', newRequest)
		});
	};
}

export function deleteRequest(reqId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_REQUEST',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/request/${reqId}`)
		});
	};
}
