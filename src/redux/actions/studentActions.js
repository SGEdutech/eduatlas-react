import axios from 'axios';

export function addStudent(newCourse) {
	return dispatch => {
		dispatch({
			type: 'ADD_STUDENT',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student', newCourse)
		});
	};
}

export function editStudent(studentId, editedData) {
	return dispatch => {
		dispatch({
			type: 'EDIT_STUDENT',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}`, editedData)
		});
	};
}

export function deleteStudent(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_STUDENT',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${id}`)
		});
	};
}
