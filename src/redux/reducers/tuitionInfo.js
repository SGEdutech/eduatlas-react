const initState = {};

function tuitionInfoReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return action.payload.data.tuitionInfo;
		case 'EDIT_TUITION_INFO_FULFILLED': {
			console.log(action.payload.data);
			return action.payload.data;
		}
		default:
			return state;
	}
}

export default tuitionInfoReducer;
