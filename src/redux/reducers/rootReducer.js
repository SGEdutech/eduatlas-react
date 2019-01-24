import { combineReducers } from 'redux';

import course from './course';
import batch from './batch';

export default combineReducers({
	course,
	batch
});
