const initState = {
	notifications: []
};

function notificationReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, notifications: action.payload.data.notifications };
		case 'ADD_NOTIFICATION_FULFILLED':
			return { ...state, notifications: [...state.notifications, action.payload.data] };
		case 'READ_NOTIFICATION_FULFILLED': {
			const editedNotification = action.payload.data;
			const { _id } = editedNotification;
			const newNotifications = state.notifications.map(notification => notification._id === _id ? editedNotification : notification);
			return { ...state, notifications: newNotifications };
		}
		default:
			return state;
	}
}

export default notificationReducer;
