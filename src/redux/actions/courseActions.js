import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addCourse(newCourse) {
	return dispatch => {
		dispatch({
			type: 'ADD_COURSE',
			payload: axios.post(`https://eduatlas.com/tuition/${tuitionId}/course`, newCourse)
		});
	};
}

export function editCourse(courseId, editedData) {
	return dispatch => {
		dispatch({
			type: 'EDIT_COURSE',
			payload: axios.put(`https://eduatlas.com/tuition/${tuitionId}/course/${courseId}`, editedData)
		});
	};
}

export function deleteCourse(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_COURSE',
			payload: axios.delete(`https://eduatlas.com/tuition/${tuitionId}/course/${id}`)
		});
	};
}
