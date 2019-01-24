import React from 'react';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import { Card } from 'antd';

const iconsArray = [
	<IconsWithTooltip tooltipMessage="Edit" iconType="edit" />,
	<IconsWithTooltip tooltipMessage="Delete" iconType="delete" />
];

function BatchCard(props) {
	const { code, discription, courseCode, numberOfStudents } = props;
	return (
		<Card className="mb-3"
			title={code}
			actions={iconsArray}>
			<p>{discription}</p>
			<p><span className="font-weight-bold">Course:</span> {courseCode}</p>
			<p><span className="font-weight-bold">Number Of Students:</span> {numberOfStudents}</p>
		</Card>
	);
}

export default BatchCard;
