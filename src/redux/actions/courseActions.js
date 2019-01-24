import axios from 'axios';

export function addCourse(newCourse) {
	return dispatch => {
		dispatch({
			type: 'ADD_COURSE',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course', newCourse)
		});
	};
}

export function updateCourse(updatedCourse) {
	return {
		type: 'UPDATE_COURSE',
		payload: updatedCourse
	};
}

export function deleteCourse(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_COURSE',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${id}`)
		});
	};
}
