import axios from 'axios';

export function addSchedule(courseId, batchId, newSchedule) {
	return dispatch => {
		dispatch({
			type: 'ADD_SCHEDULE',
			payload: axios.post(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}/batch/${batchId}/schedule`, newSchedule)
		});
	};
}

export function editSchedule(courseId, batchId, scheduleId, editedSchedule) {
	return dispatch => {
		dispatch({
			type: 'EDIT_SCHEDULE',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}/batch/${batchId}/schedule/${scheduleId}`, editedSchedule)
		});
	};
}

export function deleteSchedule(courseId, batchId, scheduleId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_SCHEDULE',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}/batch/${batchId}/schedule/${scheduleId}`)
		});
	};
}
