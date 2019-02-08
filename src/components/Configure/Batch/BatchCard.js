import React from 'react';
import { Link } from 'react-router-dom';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import { Card, Col, Row } from 'antd';

function BatchCard(props) {
	const { id, code, description, courseId, courseCode, numberOfStudents, deleteBatch, editBatch } = props;

	const iconsArray = [
		<Link to={'/tuition/edit-batch/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteBatch(courseId, id)} />
	];

	return (
		<Card className="mb-3"
			title={<span className="text-uppercase">{code}</span>}
			actions={iconsArray}>
			<Row>
				<Col>
					<div><span className="font-weight-bold">Course:</span> <span className="text-uppercase">{courseCode}</span></div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">Number Of Students:</span> {numberOfStudents}</div>
				</Col>
				<Col>
					{/* {description} */}
				</Col>
			</Row>
		</Card>
	);
}

export default BatchCard;
