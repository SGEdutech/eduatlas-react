import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Row, Col, Card } from 'antd';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

function AnnouncementCard(props) {
	const { id, message, receivers, createdAt } = props;
	// let iconsArray = [
	// 	<Link to={'/tuition/edit-schedule/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
	// 	<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteSchedule(courseId, batchId, id)} />
	// ];
	// if (isAttendance) {
	// 	iconsArray = [
	// 		<Link to={'/tuition/attendance/' + id}><IconsWithTooltip tooltipMessage="View" iconType="eye" /></Link>,
	// 		<IconsWithTooltip tooltipMessage="Add/Edit" iconType="usergroup-add" />
	// 	];
	// }

	return (
		<Card className="mb-3"
			title={<div className="text-capitalize"><span className="font-weight-bold">{createdAt}</span></div>}>
			<Row>
				<Col>
					<div><span className="font-weight-bold">Message: </span> {message}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">No. Of Receivers: </span> {receivers.length}</div>
				</Col>
			</Row>
		</Card>
	);
}

export default AnnouncementCard;
