import axios from 'axios';

export default () => dispatch => {
	dispatch({
		payload: axios.get('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/dashboard'),
		type: 'FETCH_ALL'
	});
};
