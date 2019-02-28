import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addResource(newResource) {
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	};
	const form_data = new FormData();

	newResource.students = ['5c778e0782fc661592856ea9'];
	for (const key in newResource) {
		form_data.append(key, newResource[key]);
	}
	return dispatch => {
		dispatch({
			type: 'ADD_RESOURCE',
			payload: axios.post(`https://eduatlas.com/tuition/${tuitionId}/resource`, form_data, config)
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
