import { combineReducers } from 'redux';

import batch from './batch';
import course from './course';
import discount from './discount';
import messageInfo from './messageInfo';
import notification from './notification';
import request from './request';
import student from './student';
import schedule from './schedule';
import user from './user';

export default combineReducers({
	batch,
	course,
	discount,
	messageInfo,
	notification,
	request,
	student,
	schedule,
	user
});
