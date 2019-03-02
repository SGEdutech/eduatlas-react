import React, { Component } from 'react';

import sanatizeFormObj from '../../../scripts/sanatize-form-obj';

import {
	Button,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Select
} from 'antd';
const { Option } = Select;

const formItemLayout = {
	labelCol: {
	},
	wrapperCol: {
	}
};

const colLayout = {
	xs: 24,
	md: 12
};

class AddTest extends Component {
	handleSubmit = e => {
		e.preventDefault();
		const { form, history, match } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			console.log(values);
			// history.goBack();
		});
	}

	validateTestCode = (rule, code = '', callback) => {
		// const { discountId } = this.props.match.params;
		// code = code.trim().toLowerCase();
		// if (!code) callback('invalid!');
		// const discountInfo = this.props.discounts.filter(discount => discount._id !== discountId)
		// 	.find(discount => discount.code === code);
		// const isDuplicate = Boolean(discountInfo);
		// if (isDuplicate) callback('code already exists');
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
								{...formItemLayout}
								label="Test Name"
								hasFeedback={true}>
								{getFieldDecorator('testName', {
									// initialValue: code,
									rules: [{
										required: true, message: 'Please give some name!'
									}, {
										validator: this.validateTestCode
									}]
								})(
									<Input placeholder="Test Name/Code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Max Score"
								hasFeedback={true}>
								{getFieldDecorator('maxScore', {
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
								{...formItemLayout}
								label="Select Batch(s)"
								hasFeedback={true}>
								{getFieldDecorator('selectBatch', {
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

