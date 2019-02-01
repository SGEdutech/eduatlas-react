import axios from 'axios';

export function getUserInfo(id) {
	return dispatch => {
		dispatch({
			type: 'FETCH_USER',
			payload: axios.post('https://eduatlas.com/user/info')
		});
	};
}

export function editProfile(discountId, editedDiscount) {
	return dispatch => {
		dispatch({
			type: 'EDIT_PROFILE',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/discount/${discountId}`, editedDiscount)
		});
	};
}

export function deleteDiscount(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_DISCOUNT',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/discount/${id}`)
		});
	};
}
