import axios from 'axios';

export function fetchTodos() {
	return function (dispatch) {
		dispatch({
			type: 'FETCH_TODOS',
			payload: axios.get('http://rest.learncode.academy/api/robo/todos')
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
	return function (dispatch) {
		dispatch({
			type: 'DELETE_COURSE',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/course/${id}`)
		});
	};
}
