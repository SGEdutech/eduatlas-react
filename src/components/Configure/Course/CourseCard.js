import React from 'react';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import { Card } from 'antd';

const iconsArray = [
	<IconsWithTooltip tooltipMessage="Edit" iconType="edit" />,
	<IconsWithTooltip tooltipMessage="Delete" iconType="delete" />
];

function CourseCard(props) {
	const { code, discription, numberOfBatches, courseFee } = props;
	return (
		<Card title={code}
			actions={iconsArray}>
			<p>{discription}</p>
			<p><span className="font-weight-bold">Number Of Batches:</span> {numberOfBatches}</p>
			<p><span className="font-weight-bold">Course Fee:</span> {courseFee}</p>
		</Card>
	);
}

export default CourseCard;
