const initState = { schedules: [] };

function scheduleReducer(state = initState, action) {
	switch (action.type) {
		case 'FETCH_ALL_FULFILLED': {
			return { ...state, schedules: action.payload.data.schedules };
		}
		case 'ADD_SCHEDULE_FULFILLED': {
			return { ...state, schedules: [...state.schedules, ...action.payload.data] };
		}
		case 'EDIT_SCHEDULE_FULFILLED': {
			const editedSchedule = action.payload.data;
			const { _id: editedScheduleId } = editedSchedule;
			const schedules = state.courses.map(schedule => schedule._id === editedScheduleId ? editedSchedule : schedule);
			return { ...state, schedules };
		}
		case 'DELETE_SCHEDULE_FULFILLED': {
			return { ...state, schedules: state.schedules.filter(schedule => schedule._id !== action.payload.data._id) };
		}
		case 'DELETE_COURSE_FULFILLED': {
			return { ...state, schedules: state.schedules.filter(schedule => schedule.courseId === action.payload.data._id) };
		}
		case 'DELETE_BATCH_FULFILLED': {
			return { ...state, schedules: state.schedules.filter(schedule => schedule.batchId === action.payload.data._id) };
		}
		default:
			return state;
	}
}

export default scheduleReducer;
