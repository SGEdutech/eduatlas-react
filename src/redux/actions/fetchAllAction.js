import axios from 'axios';

export default () => dispatch => {
	dispatch({
		payload: axios.get('https://eduatlas.com/tuition/dashboard/5bbe191a64512a2f77b84c70'),
		type: 'FETCH_ALL'
	});
};
