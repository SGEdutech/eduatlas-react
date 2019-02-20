import axios from 'axios';
import { tuitionId } from '../../config.json';

export default () => dispatch => {
	dispatch({
		payload: axios.get(`https://eduatlas.com/tuition/${tuitionId}/dashboard`),
		type: 'FETCH_ALL'
	});
};
