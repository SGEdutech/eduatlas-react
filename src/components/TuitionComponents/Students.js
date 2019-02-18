import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Modal } from 'antd';

import { addStudent, deleteStudent } from '../../redux/actions/studentActions';
import { deleteRequest } from '../../redux/actions/requestActions';

import Active from './Students/Active';
import AddStudent from './Students/AddStudent';
import Requests from './Students/Requests';

const confirm = Modal.confirm;

class Students extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	showDeleteConfirm = id => {
		const { deleteRequest } = this.props;
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteRequest(id);
			}
		});
	};

	render() {
		const { value } = this.state;
		const { request, addStudent, student, batch, deleteStudent, messageInfo } = this.props;
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
				{value === 0 && <Requests requests={request.requests} addStudent={addStudent} deleteRequest={this.showDeleteConfirm} batches={batch.batches} />}
				{value === 1 && <Active messageInfo={messageInfo} studentsInfo={student} deleteStudent={deleteStudent} />}
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
		discount: state.discount,
		request: state.request
	};
}

export default connect(mapStateToProps, { addStudent, deleteStudent, deleteRequest })(Students);
