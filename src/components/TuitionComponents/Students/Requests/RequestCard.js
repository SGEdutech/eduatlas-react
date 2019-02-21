import React, { Component } from 'react';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

import { addStudent } from '../../../../redux/actions/studentActions';

import sanatizeFormObj from '../../../../scripts/sanatize-form-obj';

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
	handleSubmit = e => {
		e.preventDefault();
		const { addStudent, batches, form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			const batchInfo = batches.find(batch => batch._id === values.batchId);
			// TODO: Throw error
			if (Boolean(batchInfo) === false) return;
			values.batchInfo = { batchId: batchInfo._id, courseId: batchInfo.courseId };
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
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
							rules: [{ required: true, message: 'Please input roll number!' }]
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

