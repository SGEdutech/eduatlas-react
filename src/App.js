import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';

import Nav1Content from './components/Nav1Content';

import {
	Icon,
	Tabs,
	Layout,
} from 'antd';
const {
	Header, Footer, Sider, Content,
} = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
	render() {
		const tabBarStyle = {
			position: 'fixed',
			top: 0,
			width: '100%',
			background: '#fff',
			textAlign: 'center',
			zIndex: 2
		};

		const headerStyle = {
			textAlign: 'center',
		};

		return (
			<div>
				{/* <nav className="navbar fixed-top bg-dark" style={headerStyle}>
					<p>IMS</p>
				</nav> */}
				<Tabs size="large" defaultActiveKey="1" tabBarStyle={tabBarStyle}>
					<TabPane tab={<span><Icon type="setting" />Configure</span>} key="1">
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
