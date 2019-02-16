import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { deleteSchedule } from '../../redux/actions/scheduleActions';

import AddSchedule from './Schedule/AddSchedule';
import ActiveSchedules from './Schedule/ActiveSchedules';


class Schedule extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		return (
			// <Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
			// 	<TabPane tab="Active Schedules" key="2">
			// 		<ActiveSchedules />
			// 	</TabPane>
			// 	<TabPane tab="Add Schedule" key="3">
			// 		<AddSchedule />
			// 	</TabPane>
			// </Tabs>
			<>
				<AppBar position="fixed" color="default">
					<Tabs
						style={{ width: '100%', position: 'fixed', bottom: 0, background: 'white' }}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto">
						<Tab label="Active Schedules" />
						<Tab label="Add Schedule" />
					</Tabs>
				</AppBar>
				{value === 0 && <ActiveSchedules />}
				{value === 1 && <AddSchedule />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return { schedule: state.schedule };
}

export default connect(mapStateToProps, { deleteSchedule })(Schedule);
