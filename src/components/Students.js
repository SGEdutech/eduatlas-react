import React, { Component } from 'react';

import Active from './Students/Active';
import AddStudent from './Students/AddStudent';
import Requests from './Students/Requests';

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

class Students extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Requests" key="1">
					<Requests />
				</TabPane>
				<TabPane tab="Active Students" key="2">
					<Active />
				</TabPane>
				<TabPane tab="Add New Student" key="3">
					<AddStudent />
				</TabPane>
			</Tabs>
		);
	}
}

export default Students;
