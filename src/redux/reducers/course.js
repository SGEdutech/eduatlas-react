const initState = {
	courses: [],
	error: null,
	fetched: false,
	fetching: false,
	deleting: false,
	deleted: false
};

function courseReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_PENDING':
			return { ...state, fetching: true };
		case 'FETCH_ALL_REJECTED':
			return { ...state, fetching: false, error: action.payload };
		case 'FETCH_ALL_FULFILLED':
			return {
				...state,
				courses: action.payload.data.courses,
				fetched: true,
				fetching: false
			};
		case 'ADD_COURSE':
			return {
				...state.courses,
				courses: [...state.courses, action.payload]
			};
		case 'UPDATE_COURSE': {
			const { _id } = action.payload;
			const newCourses = state.courses.map(course => course._id === _id ? action.payload : course);
			return {
				...state,
				courses: newCourses
			};
		}
		case 'DELETE_COURSE_PENDING':
			return { ...state, deleting: true, deleted: false };
		case 'DELETE_COURSE_REJECTED':
			return { ...state, deleting: false, error: action.payload };
		case 'DELETE_COURSE_FULFILLED':
			return {
				...state,
				courses: state.courses.filter(course => course._id !== action.payload.data._id),
				deleting: false,
				deleted: true
			};
		default:
			return state;
	}
}

export default courseReducer;
