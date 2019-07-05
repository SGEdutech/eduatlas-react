import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Swipeable } from 'react-swipeable';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Attendance from './Attendance';
import Communicator from './Communicator';
// import Configure from './Configure';
import PerformanceReport from './PerformanceReport';
import Reports from './Reports';
import Schedule from './Schedule';
import Students from './Students';
import StudyMaterial from './StudyMaterial';

import { changeTabs } from '../../redux/actions/navigationActions';

class PrimaryTuitionTabs extends Component {
	handleChange = (e, value) => this.props.changeTabs(value, 0);

	leftSwipe = () => {
		const { changeTabs, navigation: { primaryTabsValue } } = this.props;
		const minValue = 0;
		const maxValue = 2;
		let newPrimaryTabsValue = primaryTabsValue + 1;
		if (newPrimaryTabsValue < minValue) newPrimaryTabsValue = maxValue;
		if (newPrimaryTabsValue > maxValue) newPrimaryTabsValue = minValue;
		changeTabs(newPrimaryTabsValue, 0);
	}

	rightSwipe = () => {
		const { changeTabs, navigation: { primaryTabsValue } } = this.props;
		const minValue = 0;
		const maxValue = 2;
		let newPrimaryTabsValue = primaryTabsValue - 1;
		if (newPrimaryTabsValue < minValue) newPrimaryTabsValue = maxValue;
		if (newPrimaryTabsValue > maxValue) newPrimaryTabsValue = minValue;
		changeTabs(newPrimaryTabsValue, 0);
	}

	render() {
		const { courses, batches, navigation: { primaryTabsValue }, students } = this.props;
		return (
			<>
				<AppBar position="fixed" style={{ top: 40 }} className="z101">
					<Tabs
						style={{ background: '#f6f6f6' }}
						value={primaryTabsValue}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable">
						{/* <Tab label="Configure" /> */}
						{/* <Tab label="Students" /> */}
						{/* <Tab label="Communicator" /> */}
						<Tab label="Schedule" />
						<Tab label="Attendance" />
						{/* <Tab label="Tests And Reports" /> */}
						<Tab label="Study Material" />
						{/* <Tab label="Reports" /> */}
					</Tabs>
				</AppBar>
				<Swipeable delta={20} onSwipedLeft={this.leftSwipe} onSwipedRight={this.rightSwipe} style={{ minHeight: '80vh' }}>
					<div className="py-3">
						{/* {primaryTabsValue === 0 && <Configure />} */}
						{/* {primaryTabsValue === 0 && <Students />} */}
						{/* {primaryTabsValue === 1 && <Communicator />} */}
						{primaryTabsValue === 0 && <Schedule />}
						{primaryTabsValue === 1 && <Attendance />}
						{/* {primaryTabsValue === 4 && <PerformanceReport />} */}
						{primaryTabsValue === 2 && <StudyMaterial />}
						{/* {primaryTabsValue === 6 && <Reports batches={batches} courses={courses} students={students} />} */}
					</div>
				</Swipeable>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		courses: state.course.courses,
		navigation: state.navigation,
		students: state.student.students
	};
}

export default connect(mapStateToProps, { changeTabs })(PrimaryTuitionTabs);

