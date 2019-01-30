const initState = {
	fetching: false,
	fetched: false,
	kaamChaluHai: false,
	kaamHoGaya: false,
	lifafa: {}
};

const pendingRegex = new RegExp('_PENDING$');
const rejectedRegex = new RegExp('_REJECTED$');
const fulfilledRegex = new RegExp('_FULFILLED$');

function messageReducer(state = initState, action) {
	if (action.type === 'FETCH_ALL_PENDING') {
		return { ...state, fetching: true };
	} else if (action.type === 'FETCH_ALL_REJECTED') {
		return {
			...state,
			fetching: false,
			lifafa: {
				sandesh: 'There was a problem connecting to the server.',
				level: 'error'
			}
		};
	} else if (action.type === 'FETCH_ALL_FULFILLED') {
		return {
			...state,
			fetched: true,
			fetching: false
		};
	} else if (pendingRegex.test(action.type)) {
		return { ...state, kaamChaluHai: true };
	} else if (rejectedRegex.test(action.type)) {
		return {
			...state,
			kaamChaluHai: false,
			kaamHoGaya: true,
			lifafa: {
				sandesh: 'There was a problem connecting to the server.',
				level: 'error'
			}
		};
	} else if (fulfilledRegex.test(action.type)) {
		return {
			...state,
			kaamChaluHai: false,
			kaamHoGaya: true,
			lifafa: {
				sandesh: 'Done',
				level: 'success'
			}
		};
	} else if (action.type === 'RESET_SANDESH') {
		return {
			...state,
			kaamHoGaya: false,
			lifafa: {}
		};
	}
	return state;
}

export default messageReducer;
