const initState = {
	tests: []
};

function courseReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED': {
			return { ...state, tests: action.payload.data.tests };
		}
		case 'ADD_TEST_FULFILLED': {
			return { ...state, tests: [...state.tests, action.payload.data] };
		}
		case 'EDIT_TEST_FULFILLED': {
			const editedTest = action.payload.data;
			const { _id: editedTestId } = editedTest;
			const newTests = state.tests.map(test => test._id === editedTestId ? editedTest : test);
			return { ...state, tests: newTests };
		}
		case 'DELETE_TEST_FULFILLED': {
			return { ...state, tests: state.tests.filter(test => test._id !== action.payload.data._id) };
		}
		case 'DELETE_BATCH_FULFILLED': {
			const deletedBatchId = action.payload.data._id;
			const tests = [...state.tests];
			tests.forEach(test => test.batcheIds = test.batcheIds.filter(batchId => batchId !== deletedBatchId));
			return { ...state, tests };
		}
		default: {
			return state;
		}
	}
}

export default courseReducer;
