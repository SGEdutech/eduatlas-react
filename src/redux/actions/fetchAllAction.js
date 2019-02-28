import axios from 'axios';
import { tuitionId } from '../../config.json';

export default () => dispatch => {
	dispatch({
		payload: axios.get(`http://localhost:6868/tuition/${tuitionId}/dashboard`, { withCredentials: true }),
		type: 'FETCH_ALL'
	});
};
