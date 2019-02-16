import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Configure from './Configure';
import Students from './Students';
import Schedule from './Schedule';
import Attendance from './Attendance';
import Communicator from './Communicator';
import StudyMaterial from './StudyMaterial';

class PrimaryTuitionTabs extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		return (
			<>
				<AppBar position="fixed" color="default" style={{ top: 40 }}>
					<Tabs
						// className={classes.stickToBottom}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto">
						<Tab label="Configure" />
						<Tab label="Students" />
						<Tab label="Communicator" />
						<Tab label="Schedule" />
						<Tab label="Attendance" />
						<Tab label="Study Material" />
					</Tabs>
				</AppBar>
				{value === 0 && <Configure />}
				{value === 1 && <Students />}
				{value === 2 && <Communicator />}
				{value === 3 && <Schedule />}
				{value === 4 && <Attendance />}
				{value === 5 && <StudyMaterial />}
			</>
		);
	}
}

export default PrimaryTuitionTabs;
