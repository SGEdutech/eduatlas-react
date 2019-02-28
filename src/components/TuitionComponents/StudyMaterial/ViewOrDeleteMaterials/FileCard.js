import React, { Component } from 'react';

import {
	Card,
	Icon,
	Modal,
	Row,
	Tag
} from 'antd';
const { Meta } = Card;
const confirm = Modal.confirm;

class FileCard extends Component {
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
				actions={[<a href={path} download><Icon type="download" /></a>, <Icon type="delete" onClick={this.handleDeleteBtnClick} />]}
			>
				<Meta
					avatar={<Icon style={{ fontSize: 32 }} type="file" theme="twoTone" twoToneColor="#00bcd4" />}
					title={title}
					description={
						<>
							<Row>
								<Tag color="cyan">{type}</Tag>
							</Row>
							<Row>
								{description}
							</Row>
						</>
					}
				/>
			</Card>
		);
	}
}
export default FileCard;

