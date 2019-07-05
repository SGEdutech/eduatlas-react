export default function getRandomColor() {
	const colorList = ['#e6615a', '#ffe51d', '#00afef', '#00a859', 'grey'];
	const randomNumber = _getRandomInt(0, colorList.length - 1);
	return colorList[randomNumber];
}

function _getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}