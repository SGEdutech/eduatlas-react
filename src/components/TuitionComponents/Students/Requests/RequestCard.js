import React, { Component } from 'react';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

import sanatizeFormObj from '../../../../scripts/sanatize-form-obj';

import fallBackDp from '../../../../fallback-dp.svg';

import {
	Avatar,
	Card,
	Form,
	Icon,
	Input,
	Select
} from 'antd';
const { Meta } = Card;
const Option = Select.Option;


class RequestCard extends Component {
	validateRollNumber = (rule, rollNumber = '', callback) => {
		const { students } = this.props;

		rollNumber = rollNumber.trim().toLowerCase();
		if (!rollNumber) callback('invalid!');
		const isDuplicate = students.find(student => student.rollNumber === rollNumber);
		if (isDuplicate) callback('Roll Number already exists');
		callback();
	}

	handleSubmit = e => {
		e.preventDefault();
		const { addStudent, batches, courses, form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			const batchInfo = batches.find(batch => batch._id === values.batchId);
			if (Boolean(batchInfo) === false) return;
			const courseInfo = courses.find(course => course._id === batchInfo.courseId);
			if (Boolean(courseInfo) === false) return;
			// TODO: Throw error
			values.batchInfo = { batchId: batchInfo._id, courseId: batchInfo.courseId };
			values.payments = [{ courseCode: courseInfo.code, courseFee: courseInfo.fees }];
			delete values.batchId;
			addStudent(values);
		});
	}

	handleRejectBtnClick = () => {
		const { requestInfo, deleteRequest } = this.props;
		const reqId = requestInfo._id;
		deleteRequest(reqId);
	}

	render() {
		const { batches, form: { getFieldDecorator }, requestInfo: { email, name } } = this.props;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Card
					className="mb-3"
					actions={[
						<IconsWithTooltip onClick={this.handleSubmit} iconType="check" tooltipMessage="Accept" />,
						<IconsWithTooltip onClick={this.handleRejectBtnClick} iconType="close" tooltipMessage="Reject" />
					]}
					title={
						<Meta
							avatar={<Avatar src={fallBackDp} />}
							title={name} />
					}>
					<Form.Item className="d-none">
						{getFieldDecorator('name', {
							initialValue: name
						})(
							<Input />
						)}
					</Form.Item>
					<Form.Item >
						{getFieldDecorator('email', {
							initialValue: email
						})(
							<Input readOnly addonAfter={<Icon type="mail" />} />
						)}
					</Form.Item>
					<Form.Item >
						{getFieldDecorator('rollNumber', {
							rules: [
								{ required: true, message: 'Please input roll number!' },
								{ validator: this.validateRollNumber }
							]
						})(
							<Input addonAfter="Roll No." />
						)}
					</Form.Item>
					<Form.Item >
						{getFieldDecorator('batchId', {
							rules: [{ required: true, message: 'Please select batch!' }]
						})(
							<Select placeholder="Select a batch">
								{batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
							</Select>
						)}
					</Form.Item>
				</Card>
			</Form>
		);
	}
}

export default Form.create({ name: 'accept-student' })(RequestCard);

