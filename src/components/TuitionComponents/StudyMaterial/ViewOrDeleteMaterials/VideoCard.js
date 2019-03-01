import React, { Component } from 'react';

import {
	Card,
	Icon,
	Modal
} from 'antd';
const { Meta } = Card;
const { confirm } = Modal;

class VideoCard extends Component {
	showDeleteConfirm = id => {
		const { deleteResource } = this.props;
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteResource(id);
			}
		});
	};

	handleDeleteBtnClick = () => {
		const { _id } = this.props;
		this.showDeleteConfirm(_id);
	}

	render() {
		const { _id, path, title, students, description, type, ytUrl } = this.props;
		return (
			<Card
				className="mb-3"
				actions={[<Icon type="eye" />, <Icon type="delete" onClick={this.handleDeleteBtnClick} />]}
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
