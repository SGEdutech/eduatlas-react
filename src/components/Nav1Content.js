import React, { Component } from 'react';

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class Nav1Content extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={{ position: 'fixed', bottom: 0, width: '100%', background: '#fff', textAlign: 'center' }}>
				<TabPane style={({ height: 1500 })} tab="Tab 1" key="1">asdasd</TabPane>
				<TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
				<TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
				<TabPane tab="Tab 3" key="4">Content of Tab 3</TabPane>
				<TabPane tab="Tab 3" key="5">Content of Tab 3</TabPane>
				<TabPane tab="Tab 3" key="6">Content of Tab 3</TabPane>
			</Tabs>
		);
	}
}

export default Nav1Content;
