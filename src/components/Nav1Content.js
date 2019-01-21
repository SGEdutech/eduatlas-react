import React, { Component } from 'react';

import Course from './Course';
import AddCourse from './AddCourse';

import {
	Tabs,
} from 'antd';
const TabPane = Tabs.TabPane;

const innerTabs = {
	position: 'fixed',
	bottom: 0,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 100
}

class Nav1Content extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane style={({ height: 1500 })} tab="Courses" key="1">
					<Course />
				</TabPane>
				<TabPane tab="Add Course" key="4">
					<AddCourse />
				</TabPane>
				<TabPane tab="Batches" key="2">Batches</TabPane>
				<TabPane tab="Discounts" key="3">Discounts</TabPane>
			</Tabs>
		);
	}
}

export default Nav1Content;
