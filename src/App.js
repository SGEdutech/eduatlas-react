import './core/css/material-kit.css';
import './App.css';
import React, { Component } from 'react';

import Nav1Content from './components/Nav1Content';
import { Icon, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class App extends Component {
	render() {
		return (
			<div>
				<Tabs size="large" defaultActiveKey="1" tabBarStyle={{ position: 'fixed', top: 0, width: '100%' }}>
					<TabPane tab={<span><Icon spin type="setting" />Configure</span>} key="1">
						Tab 1
					</TabPane>
					<TabPane tab={<span><Icon type="rise" />Promoter</span>} key="2">
						<Nav1Content />
					</TabPane>
					<TabPane tab={<span><Icon type="message" />Communicator</span>} key="3">
						Tab 2
					</TabPane>
					<TabPane tab={<span><Icon type="calendar" />Schedule</span>} key="4">
						Tab 2
					</TabPane>
					<TabPane tab={<span><Icon type="team" />Attendance</span>} key="5">
						Tab 2
					</TabPane>
					<TabPane tab={<span><Icon type="file-search" />Report</span>} key="6">
						Tab 2
					</TabPane>
					<TabPane tab={<span><Icon type="paper-clip" />Study Meterial</span>} key="7">
						Tab 2
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default App;
