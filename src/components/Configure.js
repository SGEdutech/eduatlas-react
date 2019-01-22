import React, { Component } from 'react';

import AddBatch from './Configure/AddBatch';
import AddDiscount from './Configure/AddDiscount';
import Course from './Configure/Course';
import Batch from './Configure/Batch';
import Discount from './Configure/Discount';

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

class Configure extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Courses" key="1">
					<Course />
				</TabPane>
				<TabPane tab="Batches" key="2">
					<Batch />
				</TabPane>
				<TabPane tab="Discounts" key="3">
					<Discount />
				</TabPane>
			</Tabs>
		);
	}
}

export default Configure;
