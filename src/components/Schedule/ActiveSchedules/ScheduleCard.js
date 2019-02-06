import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Row, Col, Card } from 'antd';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

export default function ScheduleCard(props) {
	const { id, date, faculty, topic, fromTime, toTime, batchId, isAttendance } = props;
	let iconsArray = [
		<Link to={'/edit-schedule/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => console.log('delete it')} />
	];
	if (isAttendance) {
		iconsArray = [
			<Link to={'/attendance/' + id}><IconsWithTooltip tooltipMessage="View" iconType="eye" /></Link>,
			<IconsWithTooltip tooltipMessage="Add/Edit" iconType="usergroup-add" />
		];
	}

	return (
		<Card className="mb-3"
			title={<div className="text-capitalize"><span className="font-weight-bold">Topic: </span> {topic}</div>}
			actions={iconsArray}>
			<Row>
				<Col>
					<div><span className="font-weight-bold">Date: </span> {moment(date).format('MMM Do YYYY')}</div>
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
					<div className="text-capitalize"><span className="font-weight-bold">Faculty: </span> {faculty}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">Batch: </span><span className="text-uppercase"> {batchId}</span></div>
				</Col>
			</Row>
		</Card>
	)
}
