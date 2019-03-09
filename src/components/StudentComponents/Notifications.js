import React, { Component } from 'react';
import { tuitionName } from '../../config.json';

import {
	Alert,
	Col,
	Row
} from 'antd';

export default class Notifications extends Component {
	onClose = id => {
		const { readNotification } = this.props;
		readNotification({ ids: [id] });
	}

	render() {
		const { notifications, studentEmail } = this.props;

		const notificationsOfThisStudent = notifications.filter(notification => notification.receivers.find(receiver => Boolean(receiver.readAt) === false && receiver.userEmail === studentEmail));
		const notificationJsx = notificationsOfThisStudent.map(notification => (
			<Alert
				className="mb-3"
				description={notification.message}
				key={notification._id}
				message={
					<Row>
						<Col className="one-line-ellipsis" span={22}>{tuitionName}</Col>
						<Col className="text-right" span={2}><small className="cursor-pointer" onClick={() => this.onClose(notification._id)}>close</small></Col>
					</Row>
				}
				showIcon
				type="info" />
		));

		return (
			<div className="container">{notificationJsx}</div>
		);
	}
}
