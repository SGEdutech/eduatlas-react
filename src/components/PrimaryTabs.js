import React, { Component } from 'react';

import Configure from './Configure';
import Students from './Students';
import Schedule from './Schedule';

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

class PrimaryTabs extends Component {
	render() {
		return (
			<Tabs size="large" tabBarStyle={tabBarStyle}>
				<TabPane className="pt-3" tab={<span><Icon type="calendar" />Schedule</span>} key="5">
					<Schedule />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="setting" />Configure</span>} key="1">
					<Configure />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="team" />Students</span>} key="2">
					<Students />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="rise" />Promoter</span>} key="3">
					promoter
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="message" />Communicator</span>} key="4">
					Tab 2
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="team" />Attendance</span>} key="6">
					Tab 2
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="file-search" />Report</span>} key="7">
					Tab 2
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="paper-clip" />Study Material</span>} key="8">
					Tab 2
				</TabPane>
			</Tabs>
		);
	}
}

export default PrimaryTabs;
