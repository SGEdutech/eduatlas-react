function getFloatingBtnCss(withBottomBar = true) {
	return {
		fontSize: '2.6rem',
		color: '#00bcd4',
		position: 'fixed',
		bottom: withBottomBar ? 70 : 20,
		right: 10
	};
}

module.exports = {
	getFloatingBtnCss
};
