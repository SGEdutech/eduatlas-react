import axios from 'axios';

export function getUserInfo(id) {
	return dispatch => {
		dispatch({
			type: 'FETCH_USER',
			payload: axios.post('https://eduatlas.com/user/info')
		});
	};
}

// TODO
export function editProfile(discountId, editedDiscount) {
	return dispatch => {
		dispatch({
			type: 'EDIT_PROFILE',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/discount/${discountId}`, editedDiscount)
		});
	};
}

export function signUp(userData) {
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
			type: 'USER_LOGIN',
			payload: axios.post('https://eduatlas.com/auth/local/login', credentials)
		});
	};
}

export function logOut() {
	return dispatch => {
		dispatch({
			type: 'USER_LOGOUT',
			payload: axios.post('https://eduatlas.com/auth/local/logout')
		});
	};
}

