import React, { Component } from 'react';

import {
	Icon,
	Row
} from 'antd';

class SendRequest extends Component {
	render() {
		return (
			<Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
				<Icon style={{ fontSize: 64 }} type="clock-circle" twoToneColor="#00bcd4" />
			</Row>
		);
	}
}

export default SendRequest;

