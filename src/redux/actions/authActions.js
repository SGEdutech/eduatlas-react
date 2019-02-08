import axios from 'axios';

export function signUp(userData) {
	console.log(userData);
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post('https://eduatlas.com/auth/local/signup', userData)
		});
	};
}

export function logIn(credentials) {
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post('https://eduatlas.com/auth/local/login', credentials)
		});
	};
}

export function logoutOut(credentials) {
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post('https://eduatlas.com/auth/local/signup', credentials)
		});
	};
}
