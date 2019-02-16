const initState = {
	userInfo: { primaryEmail: 'test@gmail.com' }
};

function userReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return state;
			return { ...state, userInfo: action.payload.data.user };
		case 'USER_LOGIN_FULFILLED':
			return { ...state, userInfo: action.payload.data };
		case 'USER_LOGOUT_FULFILLED':
			return { ...state, userInfo: {} };
		default:
			return state;
	}
}

export default userReducer;
