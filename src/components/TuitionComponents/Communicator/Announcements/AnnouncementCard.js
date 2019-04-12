import React from 'react';
import { Link } from 'react-router-relative-link';

import moment from 'moment';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

import {
	Card,
	Col,
	Row
} from 'antd';

function AnnouncementCard(props) {
	const { createdAt, id, message, receivers } = props;

	const iconsArray = [
		<Link to={'./view-announcement/' + id}><IconsWithTooltip tooltipMessage="View Announcement" iconType="eye" /></Link>
	];

	return (
		<Card className="mb-3"
			actions={iconsArray}
			title={<div className="text-capitalize"><span className="font-weight-bold">{moment(createdAt).fromNow()}</span></div>}>
			<Row>
				<Col>
					<div className="one-line-ellipsis"><span className="font-weight-bold">Message: </span> {message}</div>
				</Col>
				<Col>
					<div><span className="font-weight-bold">No. Of Receivers: </span> {receivers.length}</div>
				</Col>
			</Row>
		</Card>
	);
}

export default AnnouncementCard;
