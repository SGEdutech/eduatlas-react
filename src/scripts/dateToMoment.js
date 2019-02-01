import moment from 'moment';

function isdate(data) {
	return data instanceof Date;
}

function dateToMoment(data) {
	if (typeof data !== 'object') return;
	if (Array.isArray(data)) {
		data.forEach((element, index) => {
			if (isdate(element)) {
				data[index] = moment(element);
			} else {
				dateToMoment(element);
			}
		});
		return;
	}
	// Data is an object
	if (isdate(data)) throw new Error('Date can\'t be top level data');
	const keys = Object.keys(data);
	keys.forEach(key => {
		if (isdate(data[key])) {
			data[key] = moment(data[key]);
		} else {
			dateToMoment(data[key]);
		}
	});
	return;
}

export default dateToMoment;
