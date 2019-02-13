import React, { Component } from 'react';

import Attendance from './Attendance';
import EnrollmentAndFee from './EnrollmentAndFee';
import Forums from './Forums';
import Notifications from './Notifications';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

const tabBarStyle = {
	position: 'fixed',
	top: 40,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 101
};

class PrimaryTuitionTabs extends Component {
	render() {
		return (
			<Tabs size="large" tabBarStyle={tabBarStyle}>
				<TabPane className="pt-3" tab={<span><Icon type="notification" />Notifications</span>} key="1">
					<Notifications />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="team" />Attendance</span>} key="2">
					<Attendance />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="idcard" />Enrollment and Fee</span>} key="5">
					<EnrollmentAndFee />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="message" />Forums</span>} key="3">
					<Forums />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="paper-clip" />Study Material</span>} key="4">
					<Forums />
				</TabPane>
			</Tabs>
		);
	}
}

export default PrimaryTuitionTabs;
