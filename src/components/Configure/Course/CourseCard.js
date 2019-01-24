import React from 'react';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import { Card, Row, Col } from 'antd';


function CourseCard(props) {
	const { id, code, numberOfBatches, courseFee, deleteCourse } = props;

	const iconsArray = [
		<IconsWithTooltip tooltipMessage="Edit" iconType="edit" />,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteCourse(id)} />
	];

	return (
		<Card title={code}
			actions={iconsArray}>
			<Row>
				<Col>
					<div><span className="font-weight-bold">Number Of Batches:</span> {numberOfBatches}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">Course Fee:</span> {courseFee}</div>
				</Col>
			</Row>
		</Card>
	);
}

export default CourseCard;
