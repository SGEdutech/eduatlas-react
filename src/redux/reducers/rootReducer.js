import { combineReducers } from 'redux';

import batch from './batch';
import course from './course';
import discount from './discount';
import messageInfo from './messageInfo';
import navigation from './navigation';
import notification from './notification';
import request from './request';
import resource from './resource';
import student from './student';
import schedule from './schedule';
import test from './test';
import tuitionInfo from './tuitionInfo';
import user from './user';

export default combineReducers({
	batch,
	course,
	discount,
	messageInfo,
	navigation,
	notification,
	request,
	resource,
	student,
	schedule,
	test,
	tuitionInfo,
	user
});
