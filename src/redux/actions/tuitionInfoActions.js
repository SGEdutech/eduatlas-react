import axios from 'axios';
import { schemeAndAuthority, tuitionId } from '../../config.json';

export function editReceipt(receiptInfo) {
	return dispatch => {
		dispatch({
			type: 'EDIT_TUITION_INFO',
			payload: axios.put(`${schemeAndAuthority}/tuition/${tuitionId}/receipt`, receiptInfo)
		});
	};
}
