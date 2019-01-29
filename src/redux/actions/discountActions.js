import axios from 'axios';

export function addDiscount(newDiscount) {
	return dispatch => {
		dispatch({
			type: 'ADD_DISCOUNT',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/discount', newDiscount)
		});
	};
}

export function editDiscount(discountId, editedDiscount) {
	return dispatch => {
		dispatch({
			type: 'EDIT_DISCOUNT',
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
