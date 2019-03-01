import axios from 'axios';
import { schemeAndAuthority } from '../../config.json';

export function getUserInfo() {
	return dispatch => {
		dispatch({
			type: 'FETCH_USER',
			payload: axios.post(`${schemeAndAuthority}/user/info`)
		});
	};
}

export function editProfile(userId, editedUser) {
	return dispatch => {
		dispatch({
			type: 'EDIT_PROFILE',
			payload: axios.put(`${schemeAndAuthority}/user/${userId}`, editedUser)
		});
	};
}

export function signUp(userData) {
	return dispatch => {
		dispatch({
			type: 'USER_SIGNUP',
			payload: axios.post(`${schemeAndAuthority}/auth/local/signup`, userData)
		});
	};
}

export function logIn(credentials) {
	return dispatch => {
		dispatch({
			type: 'USER_LOGIN',
			payload: axios.post(`${schemeAndAuthority}/auth/local/login`, credentials)
		});
	};
}

export function logOut() {
	return dispatch => {
		dispatch({
			type: 'USER_LOGOUT',
			payload: axios.post(`${schemeAndAuthority}/auth/local/logout`)
		});
	};
}

