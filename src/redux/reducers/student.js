const initState = {
	students: []
};

function studentReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, students: action.payload.data.students };
		case 'ADD_STUDENT_FULFILLED':
			return { ...state.students, students: [...state.students, action.payload.data] };
		case 'EDIT_STUDENT_FULFILLED': {
			const editedStudent = action.payload.data;
			const { _id } = editedStudent;
			const newStudents = state.students.map(student => student._id === _id ? editedStudent : student);
			return { ...state, students: newStudents };
		}
		case 'DELETE_STUDENT_FULFILLED':
			return { ...state, students: state.students.filter(student => student._id !== action.payload.data._id) };
		default:
			return state;
	}
}

export default studentReducer;
