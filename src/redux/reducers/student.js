const initState = {
	students: []
};

function studentReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED':
			return { ...state, students: action.payload.data.students };
		// case 'ADD_BATCH_FULFILLED':
		// 	return { ...state.batches, batches: [...state.batches, action.payload.data] };
		// case 'EDIT_BATCH_FULFILLED': {
		// 	const editedBatch = action.payload.data;
		// 	const { _id } = editedBatch;
		// 	const newBatches = state.batches.map(batch => batch._id === _id ? editedBatch : batch);
		// 	return { ...state, batches: newBatches };
		// }
		// case 'DELETE_BATCH_FULFILLED':
		// 	return { ...state, batches: state.batches.filter(batch => batch._id !== action.payload.data._id) };
		default:
			return state;
	}
}

export default studentReducer;
