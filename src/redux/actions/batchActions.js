import axios from 'axios';

export function addBatch(courseId, newBatch) {
	return dispatch => {
		dispatch({
			type: 'ADD_BATCH',
			payload: axios.post(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}/batch`, newBatch)
		});
	};
}

export function editBatch(courseId, batchId, editedData) {
	return dispatch => {
		dispatch({
			type: 'EDIT_BATCH',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}/batch/${batchId}`, editedData)
		});
	};
}

export function deleteBatch(courseId, batchId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_BATCH',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}/batch/${batchId}`)
		});
	};
}
