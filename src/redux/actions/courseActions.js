import axios from 'axios';

export function addCourse(newCourse) {
	return dispatch => {
		dispatch({
			type: 'ADD_COURSE',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course', newCourse)
		});
	};
}

export function editCourse(courseId, editedData) {
	return dispatch => {
		dispatch({
			type: 'EDIT_COURSE',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${courseId}`, editedData)
		});
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
