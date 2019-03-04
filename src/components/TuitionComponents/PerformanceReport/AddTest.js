import React, { Component } from 'react';

import sanatizeFormObj from '../../../scripts/sanatize-form-obj';

import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select
} from 'antd';
const { Option } = Select;

const colLayout = {
	xs: 24,
	md: 12
};

class AddTest extends Component {
	handleSubmit = e => {
		e.preventDefault();
		const { addTest, form, form: { resetFields } } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			addTest(values);
			resetFields();
		});
	}

	validateTestName = (rule, testName = '', callback) => {
		const { tests } = this.props;
		testName = testName.trim().toLowerCase();
		if (!testName) callback('invalid!');
		const testInfo = tests.find(discount => discount.code === testName);
		const isDuplicate = Boolean(testInfo);
		if (isDuplicate) callback('name already exists');
		callback();
	}

	render() {
		const { batches, form: { getFieldDecorator } } = this.props;

		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Row gutter={16}>
						<Col {...colLayout}>
							<Form.Item
								label="Test Name"
								hasFeedback={true}>
								{getFieldDecorator('name', {
									// initialValue: code,
									rules: [{
										required: true, message: 'Please give some name!'
									}, {
										validator: this.validateTestName
									}]
								})(
									<Input placeholder="Test Name/Code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								label="Max Score"
								hasFeedback={true}>
								{getFieldDecorator('maxMarks', {
									// initialValue: amount,
									rules: [{
										required: true, message: 'Max Score is required!'
									}]
								})(
									<InputNumber className="w-100" step={10} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								label="Date"
								hasFeedback={true}>
								{getFieldDecorator('date', {
									// initialValue: amount,
									rules: [{
										required: true, message: 'Date is required!'
									}]
								})(
									<DatePicker className="w-100" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								label="Select Batch(s)"
								hasFeedback={true}>
								{getFieldDecorator('batchIds', {
									rules: [{
										required: true, message: 'Select atleast one batch!'
									}]
								})(
									<Select
										placeholder="Select"
										mode="multiple"
										allowClear >
										{batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Add Test
									</Button>
								</Form.Item>
							</Row>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create({ name: 'add-test' })(AddTest);

