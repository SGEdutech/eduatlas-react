import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTest, deleteTest, editTest } from '../../redux/actions/testActions';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddScore from './PerformanceReport/AddScore';
import AddOrEditTest from './PerformanceReport/Test/AddOrEditTest';
import Test from './PerformanceReport/Test';

class PerformanceReport extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { addTest, batches, deleteTest, messageInfo, tests } = this.props;
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
						<Tab label="Active" />
						<Tab label="Score" />
					</Tabs>
				</AppBar>
				{value === 0 && <Test addTest={addTest} batches={batches} deleteTest={deleteTest} editTest={editTest} messageInfo={messageInfo} tests={tests} />}
				{value === 1 && <AddScore batches={batches} tests={tests} />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		schedule: state.schedule,
		batches: state.batch.batches,
		messageInfo: state.messageInfo,
		tests: state.test.tests
	};
}

export default connect(mapStateToProps, { addTest, deleteTest, editTest })(PerformanceReport);


