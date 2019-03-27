import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useSwipeable, Swipeable } from 'react-swipeable';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Configure from './Configure';
import Students from './Students';
import Schedule from './Schedule';
import Attendance from './Attendance';
import Communicator from './Communicator';
import PerformanceReport from './PerformanceReport';
import StudyMaterial from './StudyMaterial';

import { changeTabs } from '../../redux/actions/navigationActions';

class PrimaryTuitionTabs extends Component {
	handleChange = (e, value) => this.props.changeTabs(value, 0);

	leftSwipe = () => {
		const { changeTabs, navigation: { primaryTabsValue } } = this.props;
		const minValue = 0;
		const maxValue = 5;
		let newPrimaryTabsValue = primaryTabsValue + 1;
		if (newPrimaryTabsValue < minValue) newPrimaryTabsValue = maxValue;
		if (newPrimaryTabsValue > maxValue) newPrimaryTabsValue = minValue;
		changeTabs(newPrimaryTabsValue, 0);
	}

	rightSwipe = () => {
		const { changeTabs, navigation: { primaryTabsValue } } = this.props;
		const minValue = 0;
		const maxValue = 5;
		let newPrimaryTabsValue = primaryTabsValue - 1;
		if (newPrimaryTabsValue < minValue) newPrimaryTabsValue = maxValue;
		if (newPrimaryTabsValue > maxValue) newPrimaryTabsValue = minValue;
		changeTabs(newPrimaryTabsValue, 0);
	}

	render() {
		const { navigation: { primaryTabsValue } } = this.props;
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
						<Tab label="Configure" />
						<Tab label="Students" />
						<Tab label="Communicator" />
						<Tab label="Schedule" />
						<Tab label="Attendance" />
						{/* <Tab label="Study Material" /> */}
						<Tab label="Performance Report" />
					</Tabs>
				</AppBar>
				<Swipeable delta={20} onSwipedLeft={this.leftSwipe} onSwipedRight={this.rightSwipe} style={{ minHeight: '80vh' }}>
					<div className="py-3">
						{primaryTabsValue === 0 && <Configure />}
						{primaryTabsValue === 1 && <Students />}
						{primaryTabsValue === 2 && <Communicator />}
						{primaryTabsValue === 3 && <Schedule />}
						{primaryTabsValue === 4 && <Attendance />}
						{primaryTabsValue === 5 && <PerformanceReport />}
						{/* {value === 6 && <StudyMaterial />} */}
					</div>
				</Swipeable>
			</>
		);
	}
}

function mapStateToProps(state) {
	return { navigation: state.navigation };
}

export default connect(mapStateToProps, { changeTabs })(PrimaryTuitionTabs);

