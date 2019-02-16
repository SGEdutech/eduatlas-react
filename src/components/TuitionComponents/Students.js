import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { deleteStudent } from '../../redux/actions/studentActions';

import Active from './Students/Active';
import AddStudent from './Students/AddStudent';
import Requests from './Students/Requests';

class Students extends Component {
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
						variant="fullWidth">
						<Tab label="Requests" />
						<Tab label="Active" />
						<Tab label="Add" />
					</Tabs>
				</AppBar>
				{value === 0 && <Requests />}
				{value === 1 && <Active messageInfo={this.props.messageInfo} studentsInfo={this.props.student} deleteStudent={this.props.deleteStudent} />}
				{value === 2 && <AddStudent />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		batch: state.batch,
		course: state.course,
		messageInfo: state.messageInfo,
		student: state.student,
		discount: state.discount
	};
}

export default connect(mapStateToProps, { deleteStudent })(Students);
