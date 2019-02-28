import axios from 'axios';

export function addNotification(newNotification) {
	return dispatch => {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: axios.post('https://eduatlas.com/notification', newNotification)
		});
	};
}
