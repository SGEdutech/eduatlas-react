import axios from 'axios';

export function getUserInfo() {
	return dispatch => {
		dispatch({
			type: 'FETCH_USER',
			payload: axios.post('http://localhost:6868/user/info')
		});
	};
}

export function editProfile(userId, editedUser) {
	return dispatch => {
		dispatch({
			type: 'EDIT_PROFILE',
			payload: axios.put(`http://localhost:6868/user/${userId}`, editedUser)
		});
	};
}

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
			type: 'USER_LOGIN',
			payload: axios.post('http://localhost:6868/auth/local/login', credentials)
		});
	};
}

export function logOut() {
	return dispatch => {
		dispatch({
			type: 'USER_LOGOUT',
			payload: axios.post('http://localhost:6868/auth/local/logout')
		});
	};
}

