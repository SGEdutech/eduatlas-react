import axios from 'axios';
import { schemeAndAuthority, tuitionId } from '../../config.json';

export function addTest(newTest) {
	return dispatch => {
		dispatch({
			type: 'ADD_TEST',
			payload: axios.post(`${schemeAndAuthority}/tuition/${tuitionId}/test`, newTest)
		});
	};
}

export function editTest(testId, editedTest) {
	return dispatch => {
		dispatch({
			type: 'EDIT_TEST',
			payload: axios.put(`${schemeAndAuthority}/tuition/${tuitionId}/test/${testId}`, editedTest)
		});
	};
}

export function deleteTest(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_TEST',
			payload: axios.delete(`${schemeAndAuthority}/tuition/${tuitionId}/test/${id}`)
		});
	};
}
