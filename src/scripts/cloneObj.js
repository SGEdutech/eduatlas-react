import dateToMoment from './dateToMoment';
import momentToDate from './momentToDate';

export default obj => {
	momentToDate(obj);
	obj = JSON.parse(JSON.stringify(obj));
	dateToMoment(obj);
	return obj;
};
