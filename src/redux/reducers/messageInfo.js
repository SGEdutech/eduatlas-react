const initState = {
	fetching: false,
	fetched: false,
	kaamChaluHai: false,
	kaamHoGaya: false,
	lifafa: {}
};

function messageReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_PENDING':
			return { ...state, fetching: true };
		case 'FETCH_ALL_REJECTED':
			return {
				...state,
				fetching: false,
				lifafa: {
					sandesh: 'There was a problem connecting to the server.',
					level: 'error'
				}
			};
		case 'FETCH_ALL_FULFILLED':
			return {
				...state,
				fetched: true,
				fetching: false
			};
		case 'ADD_COURSE_PENDING':
			return { ...state, kaamChaluHai: true };
		case 'ADD_COURSE_REJECTED':
			return {
				...state,
				kaamChaluHai: false,
				kaamHoGaya: true,
				lifafa: {
					sandesh: 'There was a problem connecting to the server.',
					level: 'error'
				}
			};
		case 'ADD_COURSE_FULFILLED':
			return {
				...state,
				kaamChaluHai: false,
				kaamHoGaya: true,
				lifafa: {
					sandesh: 'Course has been successfully added',
					level: 'success'
				}
			};
		case 'DELETE_COURSE_PENDING':
			return { ...state, kaamChaluHai: true };
		case 'DELETE_COURSE_REJECTED':
			return {
				...state,
				kaamChaluHai: false,
				kaamHoGaya: true,
				lifafa: {
					sandesh: 'There was a problem in deleting the course!',
					level: 'error'
				}

			};
		case 'DELETE_COURSE_FULFILLED':
			return {
				...state,
				kaamHoGaya: true,
				kaamChaluHai: false,
				lifafa: {
					sandesh: 'Course was successfully deleted',
					level: 'success'
				}
			};
		case 'RESET_SANDESH':
			return {
				...state,
				kaamHoGaya: false,
				lifafa: {}
			};
		default:
			return state;
	}
}

export default messageReducer;
