import axios from 'axios';

export function addBatch(newBatch) {
	return dispatch => {
		dispatch({
			type: 'ADD_BATCH',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course', newBatch)
		});
	};
}

export function editBatch(courseId, editedData) {
	console.log(courseId);
	console.log(editedData);
	return dispatch => {
		dispatch({
			type: 'EDIT_BATCH',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}`, editedData)
		});
	};
}

export function deleteBatch(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_BATCH',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${id}`)
		});
	};
}
