import React, { Component } from 'react';
import { tuitionName } from '../../config.json';

import {
	Alert
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
				key={notification._id}
				className="mb-3"
				message={tuitionName}
				description={notification.message}
				type="info"
				showIcon
				closable
				onClose={() => this.onClose(notification._id)} />
		));

		return (
			<div className="container">{notificationJsx}</div>
		);
	}
}
