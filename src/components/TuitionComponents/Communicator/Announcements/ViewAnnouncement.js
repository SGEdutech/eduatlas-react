import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Row,
	Table
} from 'antd';

import Navbar from '../../../Navbar';

const columns = [{
	title: 'Name',
	dataIndex: 'name',
	key: 'name',
}, {
	title: 'Roll Number',
	dataIndex: 'rollNumber',
	key: 'rollNumber',
	width: '100'
}];

class ViewAnnouncement extends Component {
	render() {
		const { match: { params: { announcementId }, url }, notifications, students } = this.props;
		const notificationDetails = notifications.find(notification => notification._id === announcementId);
		const receiverStudents = students.filter(student => notificationDetails.receivers.find(receiver => receiver.userEmail === student.email));
		return (
			<>
				<Navbar renderBackBtn={true} navText="View Announcement" />
				<div className="container below-nav">
					<Row className="pt-3">
						<span className="font-weight-bold">Date And Time :</span> {Boolean(notificationDetails) === true ? notificationDetails.createdAt.format('lll') : undefined}
					</Row>
					<Row className="pt-3">
						<span className="font-weight-bold">Message :</span> {Boolean(notificationDetails) === true ? notificationDetails.message : undefined}
					</Row>
					<Table
						bordered={true}
						className="mb-3 pt-3"
						columns={columns}
						dataSource={receiverStudents}
						pagination={false}
						rowKey="_id" />
				</div>
			</>
		);
	}
}

export default withRouter(ViewAnnouncement);
