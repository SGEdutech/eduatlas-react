import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Modal } from 'antd';

import { addStudentInBatch } from '../../redux/actions/batchActions';
import { changeTabs } from '../../redux/actions/navigationActions';
import { deleteRequest } from '../../redux/actions/requestActions';
import { addStudent, deleteStudent } from '../../redux/actions/studentActions';

import Active from './Students/Active';
import AddStudent from './Students/AddStudent';
import Pending from './Students/Pending';
import Requests from './Students/Requests';

import getTuitionIdFromUrl from '../../scripts/getTuitionIdFromUrl';

const confirm = Modal.confirm;

class Students extends Component {
	handleChange = (e, value) => {
		const { navigation: { primaryTabsValue } } = this.props;
		this.props.changeTabs(primaryTabsValue, value);
	};

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
		const { navigation: { secondaryTabsValue } } = this.props;
		const { request, addStudent, student, batch, course, deleteStudent, messageInfo, addStudentInBatch } = this.props;
		return (
			<>
				<AppBar color="default" className="z101">
					<Tabs
						className="tabBar"
						value={secondaryTabsValue}
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
				{secondaryTabsValue === 0 && <Requests students={student.students} requests={request.requests} addStudent={addStudent} deleteRequest={this.showDeleteConfirm} batches={batch.batches} courses={course.courses} />}
				{secondaryTabsValue === 1 && <Active batches={batch.batches} messageInfo={messageInfo} studentsInfo={student} deleteStudent={deleteStudent} />}
				{secondaryTabsValue === 2 && <Pending addStudentInBatch={addStudentInBatch} batches={batch.batches} deleteStudent={deleteStudent} messageInfo={messageInfo} studentsInfo={student} />}
				{secondaryTabsValue === 3 && <AddStudent students={student.students} />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		batch: state.batch,
		course: state.course,
		messageInfo: state.messageInfo,
		navigation: state.navigation,
		student: state.student,
		discount: state.discount,
		request: state.request
	};
}

export default compose(connect(mapStateToProps, { addStudent, changeTabs, deleteStudent, deleteRequest, addStudentInBatch }), withRouter)(Students);
