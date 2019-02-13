import React, { Component } from 'react';

import {
	Alert,
	Col,
	Icon,
	Row
} from 'antd';

export default class Notifications extends Component {
	render() {
		return (
			<div className="container">
				<Alert
					className="mb-3"
					closable
					message="IMS Pitampura"
					description="Schedule for your batches has been updated."
					type="info"
					showIcon
				/>
				<Alert
					className="mb-3"
					closable
					message="IMS Pitampura"
					description="Your request for batch assignment has been accepted"
					type="success"
					showIcon
				/>
				<Alert
					className="mb-3"
					closable
					message="Eduatlas"
					description="Your Fee is due next week."
					type="warning"
					showIcon
				/>
			</div>
		)
	}
}
