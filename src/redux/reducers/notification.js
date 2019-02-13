const initState = {
	notification: []
};

function courseReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, notification: action.payload.data.notifications };
		case 'ADD_NOTIFICATION_FULFILLED':
			return { ...state, notification: [...state.courses, action.payload.data] };
		default:
			return state;
	}
}

export default courseReducer;
