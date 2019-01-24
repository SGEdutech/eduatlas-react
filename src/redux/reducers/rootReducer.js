import { combineReducers } from 'redux';

import batch from './batch';
import course from './course';
import messageInfo from './messageInfo';

export default combineReducers({
	batch,
	course,
	messageInfo
});
