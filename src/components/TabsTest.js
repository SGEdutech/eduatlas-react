import React, { Component } from 'react';

import Configure from './TuitionComponents/Configure';
import Students from './TuitionComponents/Students';
import Schedule from './TuitionComponents/Schedule';
import Attendance from './TuitionComponents/Attendance';
import Communicator from './TuitionComponents/Communicator';

import { Tabs } from 'antd-mobile';
// const TabPane = Tabs.TabPane;

const tabBarStyle = {
	position: 'fixed',
	top: 40,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 101
};

const tabs = [
	{ title: '1st Tab', body: <Configure /> },
	{ title: '2nd Tab' },
	{ title: '3rd Tab' },
	{ title: '4th Tab' },
	{ title: '5th Tab' },
	{ title: '6th Tab' },
	{ title: '7th Tab' },
	{ title: '8th Tab' },
	{ title: '9th Tab' }
];

export default class TabsTest extends Component {
	renderContent = tab =>
		(<div style={{ height: 5000 }}>
			{tab.body}
		</div>);

	render() {
		return (
			<div style={tabBarStyle}>
				<Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
					{this.renderContent}
				</Tabs>
			</div>
		)
	}
}
