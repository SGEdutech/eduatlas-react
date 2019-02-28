import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addResource(newResource) {
	return dispatch => {
		dispatch({
			type: 'ADD_RESOURCE',
			payload: axios.post(`https://eduatlas.com/tuition/${tuitionId}/resource`, newResource)
		});
	};
}

export function deleteResource(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_RESOURCE',
			payload: axios.delete(`https://eduatlas.com/tuition/${tuitionId}/resource/${id}`)
		});
	};
}
