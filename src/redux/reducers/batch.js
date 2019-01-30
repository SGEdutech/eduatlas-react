const initState = {
	batches: []
};

function batchReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, batches: action.payload.data.batches };
		case 'ADD_BATCH_FULFILLED':
			return { ...state.batches, batches: [...state.batches, action.payload.data] };
		case 'EDIT_BATCH_FULFILLED': {
			const editedBatch = action.payload.data;
			const { _id } = editedBatch;
			const newBatches = state.batches.map(batch => batch._id === _id ? editedBatch : batch);
			return { ...state, batches: newBatches };
		}
		case 'DELETE_BATCH_FULFILLED':
			return { ...state, batches: state.batches.filter(batch => batch._id !== action.payload.data._id) };
		case 'DELETE_COURSE_FULFILLED':
			return { ...state, batches: state.batches.filter(batch => batch.courseId !== action.payload.data._id) };
		// TODO: return batchId from Backend
		// case 'ADD_STUDENT_FULFILLED': {
		// 	const addedStudent = action.payload.data;
		// 	const newBatches = [...state.batches];
		// 	const batchToEdit = newBatches.find(batch => batch._id === addedStudent.batchId);
		// 	batchToEdit.students.push(addedStudent._id);
		// 	return { ...state, batches: newBatches };
		// }
		// case 'DELETE_STUDENT_FULFILLED': {
		// 	const deletedStudent = action.payload.data;
		// 	const newBatches = [...state.batches];
		// 	let batchToEdit = newBatches.find(batch => batch._id === deletedStudent.batchId);
		// 	batchToEdit.students = batchToEdit.students.filter(studentId => studentId !== deletedStudent._id);
		// 	return { ...state, batches: newBatches };
		// }
		default:
			return state;
	}
}

export default batchReducer;
