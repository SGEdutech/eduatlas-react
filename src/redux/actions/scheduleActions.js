import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addSchedule(newSchedule) {
	console.log(newSchedule);
	return dispatch => {
		dispatch({
			type: 'ADD_SCHEDULE',
			payload: axios.post(`http://localhost:6868/tuition/${tuitionId}/schedule`, newSchedule)
		});
	};
}

export function editSchedule(courseId, batchId, scheduleId, editedSchedule) {
	return dispatch => {
		dispatch({
			type: 'EDIT_SCHEDULE',
			payload: axios.put(`http://localhost:6868/tuition/${tuitionId}/course/${courseId}/batch/${batchId}/schedule/${scheduleId}`, editedSchedule)
		});
	};
}

export function deleteSchedule(courseId, batchId, scheduleId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_SCHEDULE',
			payload: axios.delete(`http://localhost:6868/tuition/${tuitionId}/course/${courseId}/batch/${batchId}/schedule/${scheduleId}`)
		});
	};
}
