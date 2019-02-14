import React, { Component } from 'react';

import {
	Alert
} from 'antd';

export default class Notifications extends Component {
	render() {
		const { notifications, studentEmail } = this.props;

		const notificationsOfThisStudent = notifications.filter(notification => notification.receivers.find(receiver => receiver.userEmail === studentEmail));
		const notificationJsx = notificationsOfThisStudent.map(notification => (
			<Alert
				key={notification._id}
				className="mb-3"
				message="IMS Pitampura"
				description={notification.message}
				type="info"
				showIcon />
		));

		return (
			<div className="container">{notificationJsx}</div>
		);
	}
}
