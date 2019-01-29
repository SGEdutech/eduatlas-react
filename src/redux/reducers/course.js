const initState = {
	courses: []
};

function courseReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, courses: action.payload.data.courses };
		case 'ADD_COURSE_FULFILLED':
			return { ...state.courses, courses: [...state.courses, action.payload.data] };
		case 'EDIT_COURSE_FULFILLED': {
			const editedCourse = action.payload.data;
			const { _id } = editedCourse;
			const newCourses = state.courses.map(course => course._id === _id ? editedCourse : course);
			return { ...state, courses: newCourses };
		}
		case 'DELETE_COURSE_FULFILLED':
			return { ...state, courses: state.courses.filter(course => course._id !== action.payload.data._id) };
		default:
			return state;
	}
}

export default courseReducer;
