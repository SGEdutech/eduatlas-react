import React, { Component } from 'react';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PerformanceEvalReport from './PerformanceReport/PerformanceEvalReport';
import Score from './PerformanceReport/Score';

class PerformanceReport extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { batches, schedules, studentInfo, tests } = this.props;
		const { value } = this.state;
		return (
			<>
				<AppBar color="default" className="z101">
					<Tabs
						className="tabBar"
						indicatorColor="primary"
						onChange={this.handleChange}
						scrollButtons="auto"
						textColor="primary"
						value={value}
						variant="fullWidth">
						<Tab label="Score" />
						<Tab label="PER" />
					</Tabs>
				</AppBar>
				{value === 0 && <Score batches={batches} studentInfo={studentInfo} tests={tests} />}
				{value === 1 && <PerformanceEvalReport batches={batches} schedules={schedules} studentInfo={studentInfo} />}
			</>
		);
	}
}

export default PerformanceReport;
