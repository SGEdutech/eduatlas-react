import { combineReducers } from 'redux';

import batch from './batch';
import course from './course';
import discount from './discount';
import messageInfo from './messageInfo';
import student from './student';

export default combineReducers({
	batch,
	course,
	messageInfo,
	student,
	discount
});
