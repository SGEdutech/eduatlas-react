import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Navbar from '../../Navbar';

import { editSchedule } from '../../../redux/actions/scheduleActions';

import {
	Avatar,
	Button,
	Form,
	List,
	Row,
	Switch
} from 'antd';

class AttendanceDetails extends Component {
	state = { students: [] }

	handleSubmit = e => {
		e.preventDefault();
		const { form, editSchedule } = this.props;
		const { resetFields } = form;
		const { scheduleId } = this.props.match.params;
		const scheduleInfo = this.props.schedules.find(schedule => schedule._id === scheduleId);
		const { courseId, batchId } = scheduleInfo;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			const studentsAbsent = [];
			const keys = Object.keys(values);
			keys.forEach(key => {
				if (values[key]) return;
				studentsAbsent.push(key);
			});
			editSchedule(courseId, batchId, scheduleId, { studentsAbsent });
			resetFields();
		});
	}

	static getDerivedStateFromProps(props, state) {
		const { scheduleId } = props.match.params;
		const { batches, students } = props;
		const scheduleInfo = props.schedules.find(scheduleObj => scheduleObj._id === scheduleId);
		// TODO: Implement loading for condition below
		if (scheduleInfo === undefined) return state;
		const batchId = scheduleInfo.batchId;
		const batchInfo = batches.find(batch => batch._id === batchId);
		const studentInfoOfThisBatch = students.filter(student => Boolean(batchInfo.students.find(studentId => studentId === student._id)));
		studentInfoOfThisBatch.forEach(student => {
			student.isAbsent = Boolean(scheduleInfo.studentsAbsent.find(studentAbsent => studentAbsent === student._id)) === false;
		});
		if (JSON.stringify(studentInfoOfThisBatch) === JSON.stringify(state.students)) return state;
		return { ...state, students: studentInfoOfThisBatch };
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { students } = this.state;
		return (
			<>
				<Navbar renderBackBtn={true} navText="Attendance" />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<List
							className="mb-3"
							itemLayout="horizontal"
							dataSource={students}
							renderItem={student => (
								<List.Item
									actions={
										[
											<Form.Item style={{ marginBottom: 0 }}>
												{getFieldDecorator(student._id, {
													initialValue: student.isAbsent,
													valuePropName: 'checked'
												})(
													<Switch />
												)}
											</Form.Item>
										]
									}>
									<List.Item.Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title={student.name}
										description={'Roll Number: ' + student.rollNumber}/>
								</List.Item>
							)} />
						<Row type="flex" justify="end">
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Submit Attendance
								</Button>
							</Form.Item>
						</Row>
					</Form>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	schedules: state.schedule.schedules,
	batches: state.batch.batches,
	students: state.student.students
});

export default compose(Form.create({ name: 'add-edit-attendance' }), withRouter, connect(mapStateToProps, { editSchedule }))(AttendanceDetails);
