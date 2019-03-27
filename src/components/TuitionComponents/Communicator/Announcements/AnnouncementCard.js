import React from 'react';

import moment from 'moment';

import { Row, Col, Card } from 'antd';

function AnnouncementCard(props) {
	const { message, receivers, createdAt } = props;

	return (
		<Card className="mb-3"
			title={<div className="text-capitalize"><span className="font-weight-bold">{moment(createdAt).fromNow()}</span></div>}>
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
