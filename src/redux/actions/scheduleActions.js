import axios from 'axios';
import { schemeAndAuthority, tuitionId } from '../../config.json';

export function addSchedule(newSchedule) {
	return dispatch => {
		dispatch({
			type: 'ADD_SCHEDULE',
			payload: axios.post(`${schemeAndAuthority}/tuition/${tuitionId}/schedule`, newSchedule)
		});
	};
}

export function editSchedule(courseId, batchId, scheduleId, editedSchedule) {
	return dispatch => {
		dispatch({
			type: 'EDIT_SCHEDULE',
			payload: axios.put(`${schemeAndAuthority}/tuition/${tuitionId}/course/${courseId}/batch/${batchId}/schedule/${scheduleId}`, editedSchedule)
		});
	};
}

export function deleteSchedule(courseId, batchId, scheduleId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_SCHEDULE',
			payload: axios.delete(`${schemeAndAuthority}/tuition/${tuitionId}/course/${courseId}/batch/${batchId}/schedule/${scheduleId}`)
		});
	};
}
