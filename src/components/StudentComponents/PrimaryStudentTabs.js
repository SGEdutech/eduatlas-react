import React, { Component } from 'react';
import { connect } from 'react-redux';

import Attendance from './Attendance';
import EnrollmentAndFee from './EnrollmentAndFee';
import Forums from './Forums';
import Notifications from './Notifications';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

const tabBarStyle = {
	position: 'fixed',
	top: 40,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 101
};

class PrimaryTuitionTabs extends Component {
	render() {
		const { batches, courses, schedules, students, user } = this.props;
		const { primaryEmail } = user;
		const studentInfo = students.find(student => student.email === primaryEmail);
		if (Boolean(studentInfo) === false) return <></>; // TODO: Handle this!!!!

		return (
			<Tabs size="large" tabBarStyle={tabBarStyle}>
				<TabPane className="pt-3" tab={<span><Icon type="notification" />Notifications</span>} key="1">
					<Notifications />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="team" />Attendance</span>} key="2">
					<Attendance batches={batches} schedules={schedules} studentInfo={studentInfo} />
				</TabPane>
				<TabPane className="pt-3" tab={<span><Icon type="idcard" />Enrollment and Fee</span>} key="5">
					<EnrollmentAndFee courses={courses} studentInfo={studentInfo} />
				</TabPane>
				{/* <TabPane className="pt-3" tab={<span><Icon type="message" />Forums</span>} key="3">
					<Forums />
				</TabPane> */}
				<TabPane className="pt-3" tab={<span><Icon type="paper-clip" />Study Material</span>} key="4">
					<Forums />
				</TabPane>
			</Tabs>
		);
	}
}

const mapStateToProps = state => ({
	batches: state.batch.batches,
	courses: state.course.courses,
	schedules: state.schedule.schedules,
	students: state.student.students,
	user: state.user.userInfo
});

export default connect(mapStateToProps)(PrimaryTuitionTabs);
