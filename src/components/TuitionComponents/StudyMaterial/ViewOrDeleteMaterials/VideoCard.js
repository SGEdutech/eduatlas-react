import React, { Component } from 'react';

import {
	Avatar,
	Card,
	Icon
} from 'antd';
const { Meta } = Card;

class VideoCard extends Component {
	render() {
		const { _id, path, title, students, description, type, ytUrl } = this.props;
		return (
			<Card
				className="mb-3"
				actions={[<Icon type="eye" />, <Icon type="delete" />]}
				cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
			>
				<Meta
					title="Abstract of Experiment 1"
					description="This is the description of abstract"
				/>
			</Card>
		);
	}
}

export default VideoCard;
