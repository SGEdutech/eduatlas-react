import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddScore from './PerformanceReport/AddScore';
import AddTest from './PerformanceReport/AddTest';


class PerformanceReport extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { batches } = this.props;
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
						variant="fullWidth">
						<Tab label="Test" />
						<Tab label="Score" />
					</Tabs>
				</AppBar>
				{value === 0 && <AddTest batches={batches} />}
				{value === 1 && <AddScore batches={batches} />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		schedule: state.schedule,
		batches: state.batch.batches
	};
}

export default connect(mapStateToProps, {})(PerformanceReport);


