import React, { Component } from 'react';

import AddCourse from './AddCourse';
import AddBatch from './AddBatch';
import AddDiscount from './AddDiscount';
import Course from './Course';
import Batch from './Batch';
import Discount from './Discount';

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

class Nav1Content extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Courses" key="1">
					<Course />
				</TabPane>
				<TabPane tab="Batches" key="2">
					<Batch />
				</TabPane>
				<TabPane tab="Add Batch" key="3">
					<AddBatch />
				</TabPane>
				<TabPane tab="Discounts" key="4">
					<Discount />
				</TabPane>
				<TabPane tab="Add Discount" key="5">
					<AddDiscount />
				</TabPane>
			</Tabs>
		);
	}
}

export default Nav1Content;
