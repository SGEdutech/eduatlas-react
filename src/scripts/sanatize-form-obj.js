export default obj => {
	const keys = Object.keys(obj);
	keys.forEach(key => {
		if (Boolean(obj[key]) === false) delete obj[key];
	});
}
