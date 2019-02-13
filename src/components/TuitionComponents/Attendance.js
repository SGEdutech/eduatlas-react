import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteSchedule } from '../../redux/actions/scheduleActions';

import AddSchedule from './Schedule/AddSchedule';
import ActiveSchedules from './Schedule/ActiveSchedules';

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

class Attendance extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Active Schedules" key="2">
					<ActiveSchedules isAttendance={true} />
				</TabPane>
			</Tabs>
		);
	}
}

function mapStateToProps(state) {
	return {
		schedule: state.schedule
	};
}

export default connect(mapStateToProps, {  })(Attendance);
