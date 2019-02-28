import axios from 'axios';

export function addNotification(newNotification) {
	return dispatch => {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: axios.post('http://localhost:6868/notification', newNotification)
		});
	};
}
