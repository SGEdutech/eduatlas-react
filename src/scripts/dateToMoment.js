import moment from 'moment';

// TODO: Write regex
function isDate(date) {
	if (typeof date === 'string') {
		const splitStr = date.split('T')[0];
		if ((splitStr.length === 10) === false) return false;
		return splitStr.split('-').length === 3;
	}
	if (typeof date === 'object') return date instanceof Date;
}

function dateToMoment(data) {
	if (typeof data !== 'object') return;
	if (Array.isArray(data)) {
		data.forEach((element, index) => {
			if (isDate(element)) {
				data[index] = moment(element);
			} else {
				dateToMoment(element);
			}
		});
		return;
	}
	// Data is an object
	if (isDate(data)) throw new Error('Date can\'t be top level data');
	const keys = Object.keys(data);
	keys.forEach(key => {
		if (isDate(data[key])) {
			data[key] = moment(data[key]);
		} else {
			dateToMoment(data[key]);
		}
	});
	return;
}

export default dateToMoment;
