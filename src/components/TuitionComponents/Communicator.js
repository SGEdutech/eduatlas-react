import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewAnnouncement from './Communicator/NewAnnouncement';
import Announcements from './Communicator/Announcements';

import { addNotification } from '../../redux/actions/notificationActions';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const innerTabs = {
	position: 'fixed',
	bottom: 0,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 100
};

const testAnnouncementArr = [{
	_id: 1,
	message: 'hi test ann here. here is something to make this message long',
	receivers: ['1', '2', '3'],
	createdAt: '23 days ago'
}];

class Communicator extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="New Announcement" key="new-announcement">
					<NewAnnouncement messageInfo={this.props.messageInfo} batches={this.props.batches} students={this.props.students} addNotification={this.props.addNotification} />
				</TabPane>
				<TabPane tab="Announcements" key="announcements">
					<Announcements messageInfo={this.props.messageInfo} announcements={testAnnouncementArr} />
				</TabPane>
			</Tabs>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		messageInfo: state.messageInfo,
		students: state.student.students
	};
}

export default connect(mapStateToProps, { addNotification })(Communicator);
