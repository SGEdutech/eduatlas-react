import axios from 'axios';
import { schemeAndAuthority, tuitionId } from '../../config.json';

export function addResource(newResource) {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	};
	const form_data = new FormData();
	const keys = Object.keys(newResource);
	keys.forEach(key => form_data.append(key, newResource[key]));
	return dispatch => {
		dispatch({
			type: 'ADD_RESOURCE',
			payload: axios.post(`${schemeAndAuthority}/tuition/${tuitionId}/resource`, form_data, config)
		});
	};
}

export function deleteResource(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_RESOURCE',
			payload: axios.delete(`${schemeAndAuthority}/tuition/${tuitionId}/resource/${id}`)
		});
	};
}
