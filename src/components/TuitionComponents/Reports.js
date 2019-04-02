import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EnrollmentReport from './Reports/EnrollmentReport';

class Reports extends Component {
	handleChange = (e, value) => {
		const { navigation: { primaryTabsValue } } = this.props;
		this.props.changeTabs(primaryTabsValue, value);
	};

	render() {
		const { courses, navigation: { secondaryTabsValue }, students } = this.props;
		return (
			<>
				<AppBar color="default" className="z101">
					<Tabs
						className="tabBar"
						value={secondaryTabsValue}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						scrollButtons="auto">
						<Tab label="Enrollment" />
					</Tabs>
				</AppBar>
				{secondaryTabsValue === 0 && <EnrollmentReport courses={courses} students={students} />}
			</>
		);
	}
}


function mapStateToProps(state) {
	return {
		courses: state.course.courses,
		navigation: state.navigation,
		students: state.student.students
	};
}

export default connect(mapStateToProps, {})(Reports);

// boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)'
