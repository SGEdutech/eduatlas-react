import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

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
			<>
				<AppBar color="default">
					<Tabs
						className="tabBar"
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth">
						<Tab label="Active" />
						<Tab label="Add" />
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
