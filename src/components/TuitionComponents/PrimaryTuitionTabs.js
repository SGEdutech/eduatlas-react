import React, { Component } from 'react';
import { useSwipeable, Swipeable } from 'react-swipeable';

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

	leftSwipe = () => {
		this.setState(prevState => {
			const minValue = 0;
			const maxValue = 5;
			let value = prevState.value + 1;
			if (value < minValue) value = maxValue;
			if (value > maxValue) value = minValue;
			return { value };
		});
	}

	rightSwipe = () => {
		this.setState(prevState => {
			const minValue = 0;
			const maxValue = 5;
			let value = prevState.value - 1;
			if (value < minValue) value = maxValue;
			if (value > maxValue) value = minValue;
			return { value };
		});
	}

	render() {
		const { value } = this.state;
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
						<Tab label="Configure" />
						<Tab label="Students" />
						<Tab label="Communicator" />
						<Tab label="Schedule" />
						<Tab label="Attendance" />
						<Tab label="Study Material" />
					</Tabs>
				</AppBar>
				<Swipeable delta={20} onSwipedLeft={this.leftSwipe} onSwipedRight={this.rightSwipe} style={{ minHeight: '80vh' }}>
					<div className="py-3">
						{value === 0 && <Configure />}
						{value === 1 && <Students />}
						{value === 2 && <Communicator />}
						{value === 3 && <Schedule />}
						{value === 4 && <Attendance />}
						{value === 5 && <StudyMaterial />}
					</div>
				</Swipeable>
			</>
		);
	}
}

export default PrimaryTuitionTabs;
