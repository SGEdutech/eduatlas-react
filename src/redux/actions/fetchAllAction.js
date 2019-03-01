import axios from 'axios';
import { schemeAndAuthority, tuitionId } from '../../config.json';

export default () => dispatch => {
	dispatch({
		payload: axios.get(`${schemeAndAuthority}/tuition/${tuitionId}/dashboard`, { withCredentials: true }),
		type: 'FETCH_ALL'
	});
};
