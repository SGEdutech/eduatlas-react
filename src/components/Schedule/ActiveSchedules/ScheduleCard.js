import React from 'react';

import { Row, Col, Card } from 'antd';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

export default function ScheduleCard(props) {
	const iconsArray = [
		<IconsWithTooltip tooltipMessage="Edit" iconType="edit" />,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => console.log('delete it')} />
	];
	const { id, date, faculty, topic, fromTime, toTime, batchId } = props;

	return (
		<Card className="mb-3"
			title={<div><span className="font-weight-bold">Topic: </span> {topic}</div>}
			actions={iconsArray}>
			<Row>
				<Col>
					<div><span className="font-weight-bold">Date: </span> {date}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">From Time: </span> {fromTime}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">To Time: </span> {toTime}</div>
				</Col>
				<Col>
					<div></div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">Faculty: </span> {faculty}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">Batch: </span> {batchId}</div>
				</Col>
			</Row>
		</Card>
	)
}
