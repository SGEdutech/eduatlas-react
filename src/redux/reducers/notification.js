const initState = {
	notifications: []
};

function notificationReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, notifications: action.payload.data.notifications };
		case 'ADD_NOTIFICATION_FULFILLED':
			return { ...state, notification: [...state.notifications, action.payload.data] };
		default:
			return state;
	}
}

export default notificationReducer;
