import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useSwipeable, Swipeable } from 'react-swipeable';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Attendance from './Attendance';
import EnrollmentAndFee from './EnrollmentAndFee';
import Forums from './Forums';
import Notifications from './Notifications';

import { readNotification } from '../../redux/actions/notificationActions';

const tabBarStyle = {
	position: 'fixed',
	top: 40,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 101
};

class PrimaryTuitionTabs extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	leftSwipe = () => {
		this.setState(prevState => {
			const minValue = 0;
			const maxValue = 3;
			let value = prevState.value + 1;
			if (value < minValue) value = maxValue;
			if (value > maxValue) value = minValue;
			return { value };
		});
	}

	rightSwipe = () => {
		this.setState(prevState => {
			const minValue = 0;
			const maxValue = 3;
			let value = prevState.value - 1;
			if (value < minValue) value = maxValue;
			if (value > maxValue) value = minValue;
			return { value };
		});
	}

	render() {
		const { value } = this.state;
		const { batches, courses, notifications, readNotification, schedules, students, user } = this.props;
		const { primaryEmail } = user;
		const studentInfo = students.find(student => student.email === primaryEmail);
		if (Boolean(studentInfo) === false) return <></>; // TODO: Handle this!!!!

		return (
			<>
				<AppBar position="fixed" style={{ top: 40 }} className="z101">
					<Tabs
						style={{ background: '#f6f6f6' }}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable">
						<Tab label="Notifications" />
						<Tab label="Attendance" />
						<Tab label="Enrollment and Fee" />
						{/* <Tab label="Study Material" /> */}
					</Tabs>
				</AppBar>
				<Swipeable delta={20} onSwipedLeft={this.leftSwipe} onSwipedRight={this.rightSwipe} style={{ minHeight: '80vh' }}>
					<div className="py-3">
						{value === 0 && <Notifications notifications={notifications} readNotification={readNotification} studentEmail={studentInfo.email} />}
						{value === 1 && <Attendance batches={batches} schedules={schedules} studentInfo={studentInfo} />}
						{value === 2 && <EnrollmentAndFee courses={courses} studentInfo={studentInfo} />}
						{/* {value === 3 && <>study material</>} */}
					</div>
				</Swipeable>
			</>
		);
	}
}

const mapStateToProps = state => ({
	batches: state.batch.batches,
	courses: state.course.courses,
	schedules: state.schedule.schedules,
	students: state.student.students,
	user: state.user.userInfo,
	notifications: state.notification.notifications
});

export default connect(mapStateToProps, { readNotification })(PrimaryTuitionTabs);
