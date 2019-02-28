import axios from 'axios';
import { tuitionId } from '../../config.json';

export function editReceipt(receiptInfo) {
	return dispatch => {
		dispatch({
			type: 'EDIT_TUITION_INFO',
			payload: axios.put(`https://eduatlas.com/tuition/${tuitionId}/receipt`, receiptInfo)
		});
	};
}
