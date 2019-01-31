import React from 'react';

const tabBarStyle = {
	position: 'fixed',
	top: 40,
	width: '100%',
	background: '#ffdb58',
	textAlign: 'center',
	zIndex: 101,
	paddingTop: '5px',
	paddingBottom: '5px'
};
export default function TitleBar(props) {
	return (
		<div className="mb-0" style={tabBarStyle}>{props.text}</div>
	);
}
