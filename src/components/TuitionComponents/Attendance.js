import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ActiveSchedules from './Schedule/ActiveSchedules';

class Attendance extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		return (
			<>
				<AppBar position="fixed" color="default">
					<Tabs
						style={{ width: '100%', position: 'fixed', bottom: 0, background: 'white' }}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth">
						<Tab label="All" />
					</Tabs>
				</AppBar>
				{value === 0 && <ActiveSchedules isAttendance={true} />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return { schedule: state.schedule };
}

export default connect(mapStateToProps)(Attendance);
