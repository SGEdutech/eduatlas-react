import axios from 'axios';
import { tuitionId } from '../../config.json';

export function addDiscount(newDiscount) {
	return dispatch => {
		dispatch({
			type: 'ADD_DISCOUNT',
			payload: axios.post(`http://localhost:6868/tuition/${tuitionId}/discount`, newDiscount)
		});
	};
}

export function editDiscount(discountId, editedDiscount) {
	return dispatch => {
		dispatch({
			type: 'EDIT_DISCOUNT',
			payload: axios.put(`http://localhost:6868/tuition/${tuitionId}/discount/${discountId}`, editedDiscount)
		});
	};
}

export function deleteDiscount(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_DISCOUNT',
			payload: axios.delete(`http://localhost:6868/tuition/${tuitionId}/discount/${id}`)
		});
	};
}
