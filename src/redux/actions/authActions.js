import axios from 'axios';

export function signUp(userData) {
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post('http://localhost:6868/auth/local/signup', userData)
		});
	};
}

export function logIn(credentials) {
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post('http://localhost:6868/auth/local/login', credentials)
		});
	};
}

export function logoutOut(credentials) {
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post('http://localhost:6868/auth/local/signup', credentials)
		});
	};
}
