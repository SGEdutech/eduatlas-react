import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addResource(newResource) {
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	};
	const form_data = new FormData();

	for (const key in newResource) {
		if (key === 'file') form_data.append('file', newResource[key], newResource[key].name);
		form_data.append(key, newResource[key]);
	}
	console.log(form_data)
	return
	return dispatch => {
		dispatch({
			type: 'ADD_RESOURCE',
			payload: axios.post(`http://localhost:6868/tuition/${tuitionId}/resource`, form_data, config)
		});
	};
}

export function deleteResource(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_RESOURCE',
			payload: axios.delete(`http://localhost:6868/tuition/${tuitionId}/resource/${id}`)
		});
	};
}
