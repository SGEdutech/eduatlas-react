import React, { Component } from 'react';

import {
	Col,
	Icon,
	Row
} from 'antd';

class SendRequest extends Component {
	componentWillMount() {
		const { addRequest, requests, userInfo } = this.props;
		const request = requests.find(request => request.email === userInfo.primaryEmail);
		if (request) return;
		addRequest({ name: userInfo.firstName + userInfo.lastName, email: userInfo.primaryEmail });
	}

	render() {
		const { requests, userInfo } = this.props;
		const sendingRequestJsx = (
			<Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
				<Col>
					<Row type="flex" justify="center">
						<Icon style={{ fontSize: 64 }} type="loading" theme="twoTone" spin />
					</Row>
					<Row type="flex" justify="center">
						<h1>Sending Request</h1>
					</Row>
				</Col>
			</Row>
		);
		const pendingJsx = (
			<Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
				<Col>
					<Row type="flex" justify="center">
						<Icon style={{ fontSize: 64 }} type="clock-circle" twoToneColor="#00bcd4" />
					</Row>
					<Row type="flex" justify="center">
						<h1>Your request is pending</h1>
					</Row>
				</Col>
			</Row>
		);
		const request = requests.find(request => request.email === userInfo.primaryEmail);
		if (request) return pendingJsx;
		return sendingRequestJsx;
	}
}

export default SendRequest;

