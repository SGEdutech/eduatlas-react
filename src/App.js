import './App.css';
import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { tabBarHeight } from './tab-bar-height.json';

import Nav1Content from './components/Nav1Content';

import {
	Affix,
	Breadcrumb,
	Col,
	Icon,
	Layout,
	Menu,
	Radio,
	Row,
	Tabs,
} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
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
				{/* <Content style={{ height: 2000 }}>Content</Content> */}
			</div>
		);
	}
}

export default App;
