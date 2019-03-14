import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Modal } from 'antd';

import { addStudent, deleteStudent } from '../../redux/actions/studentActions';
import { deleteRequest } from '../../redux/actions/requestActions';
import { addStudentInBatch } from '../../redux/actions/batchActions';

import Active from './Students/Active';
import AddStudent from './Students/AddStudent';
import Pending from './Students/Pending';
import Requests from './Students/Requests';

import getTuitionIdFromUrl from '../../scripts/getTuitionIdFromUrl';

const confirm = Modal.confirm;

class Students extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	showDeleteConfirm = studentId => {
		const { deleteRequest, match: { url } } = this.props;
		const tuitionId = getTuitionIdFromUrl(url);
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteRequest(tuitionId, studentId);
			}
		});
	};

	render() {
		const { value } = this.state;
		const { request, addStudent, student, batch, course, deleteStudent, messageInfo, addStudentInBatch } = this.props;
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
						<Tab label="Pending" />
						<Tab label="Add" />
					</Tabs>
				</AppBar>
				{value === 0 && <Requests students={student.students} requests={request.requests} addStudent={addStudent} deleteRequest={this.showDeleteConfirm} batches={batch.batches} courses={course.courses} />}
				{value === 1 && <Active batches={batch.batches} messageInfo={messageInfo} studentsInfo={student} deleteStudent={deleteStudent} />}
				{value === 2 && <Pending addStudentInBatch={addStudentInBatch} batches={batch.batches} messageInfo={messageInfo} studentsInfo={student} />}
				{value === 3 && <AddStudent students={student.students} />}
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

export default compose(connect(mapStateToProps, { addStudent, deleteStudent, deleteRequest, addStudentInBatch }), withRouter)(Students);
