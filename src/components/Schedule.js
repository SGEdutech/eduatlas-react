import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteSchedule } from '../redux/actions/scheduleActions';

import AddSchedule from './Schedule/AddSchedule';

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

class Schedule extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				{/* <TabPane tab="Requests" key="1">
					<Requests />
				</TabPane>
				<TabPane tab="Active Students" key="2">
					<Active messageInfo={this.props.messageInfo} studentsInfo={this.props.student} deleteStudent={this.props.deleteStudent} />
				</TabPane> */}
				<TabPane tab="Add Schedule" key="3">
					<AddSchedule />
				</TabPane>
			</Tabs>
		);
	}
}

function mapStateToProps(state) {
	return {
		schedule: state.schedule
		// batch: state.batch,
		// course: state.course,
		// messageInfo: state.messageInfo,
		// student: state.student,
		// discount: state.discount
	};
}

export default connect(mapStateToProps, { deleteSchedule })(Schedule);
