import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		const { value } = this.state;
		return (
			<>
				<AppBar color="default" className="z101">
					<Tabs
						className="tabBar"
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						scrollButtons="auto">
						<Tab label="Score" />
						<Tab label="PER" />
					</Tabs>
				</AppBar>
				{value === 0 && <Score />}
				{value === 1 && <PerformanceEvalReport />}
			</>
		);
	}
}


function mapStateToProps(state) {
	return {
		batch: state.batch
	};
}

export default connect(mapStateToProps, {})(PerformanceReport);
