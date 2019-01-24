const initState = {
	batches: [],
	error: null,
	fetched: false,
	fetching: false
};

function batchReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_PENDING':
			return { ...state, fetching: true };
		case 'FETCH_ALL_REJECTED':
			return { ...state, fetching: false, error: action.payload };
		case 'FETCH_ALL_FULFILLED':
			return {
				...state,
				batches: action.payload.data.batches,
				fetched: true,
				fetching: false
			};
		case 'ADD_BATCH':
			return {
				...state.batches,
				batches: [...state.batches, action.payload]
			};
		case 'UPDATE_BATCH': {
			const { _id } = action.payload;
			const newBatches = state.batches.map(batch => batch._id === _id ? action.payload : batch);
			return {
				...state,
				batches: newBatches
			};
		}
		case 'DELETE_BATCH': {
			return {
				...state,
				batches: state.batches.filter(batch => batch.id !== action.payload)
			};
		}
		default:
			return state;
	}
}

export default batchReducer;
