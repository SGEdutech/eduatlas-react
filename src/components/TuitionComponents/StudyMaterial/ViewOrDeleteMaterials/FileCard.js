import React, { Component } from 'react';

import {
	Avatar,
	Card,
	Icon
} from 'antd';
const { Meta } = Card;

class FileCard extends Component {
	render() {
		return (
			<Card
				className="mb-3"
				actions={[<Icon type="download" />, <Icon type="delete" />]}
			>
				<Meta
					avatar={<Icon style={{ fontSize: 32 }} type="file" theme="twoTone" />}
					title="Abstract of Experiment 1"
					description="This is the description of abstract"
				/>
			</Card>
		);
	}
}
export default FileCard;

