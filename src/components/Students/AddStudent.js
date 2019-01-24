import React, { Component } from 'react';

import {
	Button,
	Cascader,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Row,
	Select
} from 'antd';
const { Option } = Select;

const options = [{
	isLeaf: false,
	label: 'JEE Maths',
	value: 'JEE Maths',
}, {
	isLeaf: false,
	label: 'JEE Physics',
	value: 'JEE Physics',
},
{
	value: 'JEE Chemistry',
	label: 'JEE Chemistry',
	isLeaf: false,
}];

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 7 },
		md: { span: 9 },
		lg: { span: 10 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 17 },
		md: { span: 15 },
		lg: { span: 14 }
	}
};

const disabledFormItemLayout = {
	labelCol: {
		xs: { span: 24 }
	},
	wrapperCol: {
		xs: { span: 24 }
	}
};

const colLayout = {
	xs: 24,
	lg: 12
};

class AddStudent extends Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		options,
	};

	loadData = selectedOptions => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;

		// load options lazily
		setTimeout(() => {
			targetOption.loading = false;
			targetOption.children = [{
				label: `${targetOption.label} Batch 1`,
				value: 'dynamic1',
			}, {
				label: `${targetOption.label} Batch 2`,
				value: 'dynamic2',
			}];
			this.setState({
				options: [...this.state.options],
			});
		}, 1000);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<>
				<div className="container below-nav">
					<Row onSubmit={this.handleSubmit}>
						<Col xs={24} md={17}>
							<Form>
								<Col span={24}>
									<h3>Compulsary Fields</h3>
									<Divider />
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Roll No"
										hasFeedback
									>
										{getFieldDecorator('rollNumber', {
											rules: [{
												required: true, message: 'Please give some Roll-number!'
											}]
										})(
											<Input placeholder="roll number" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Student Name"
										hasFeedback
									>
										{getFieldDecorator('name', {
											rules: [{
												required: true, message: 'Please provide name!'
											}]
										})(
											<Input placeholder="student name" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Student Email"
										hasFeedback
									>
										{getFieldDecorator('email', {
											rules: [{
												type: 'email', message: 'The input is not valid E-mail!',
											},
											{
												required: true, message: 'Please provide email!'
											}]
										})(
											<Input placeholder="student email" />
										)}
									</Form.Item>
								</Col>
								<Col span={24}>
									<Divider />
									<h3>Additional Fields</h3>
									<Divider />
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Student Address">
										{getFieldDecorator('address', {
										})(
											<Input placeholder="student address" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Student Phone No.">
										{getFieldDecorator('phone', {
										})(
											<InputNumber className="w-100" max={99999999999} placeholder="student number" />
										)}
									</Form.Item>
								</Col>
								<Col span={24}>
									<Divider />
									<h3>Batch And Course Details</h3>
									<Divider />
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Select Course and Batch">
										{getFieldDecorator('courseAndBatch', {
										})(
											<Cascader
												options={this.state.options}
												loadData={this.loadData}
												// onChange={this.onChange}
												changeOnSelect
											/>
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Discount Code"
									>
										{getFieldDecorator('discountCode', {
										})(
											<Select placeholder="select discount code">
												<Option value="1">NEWYEAR150</Option>
												<Option value="2">NEWYEAR15</Option>
												<Option value="3">50OFF</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Additional Discount"
									>
										{getFieldDecorator('additionalDiscount', {
											initialValue:0
										})(
											<InputNumber className="w-100" step={100} min={0} max={10000000} />
										)}
									</Form.Item>
								</Col>
								<Col span={24}>
									<Divider />
									<h3>Payment Details</h3>
									<Divider />
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Fee Collected"
									>
										{getFieldDecorator('feeCollected', {
											initialValue:0
										})(
											<InputNumber className="w-100" step={500} min={0} max={100000} formatter={value => `₹${value}`} />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Mode Of Payment">
										{getFieldDecorator('modeOfPayment', {
											initialValue:"cash"
										})(
											<Select>
												<Option value="cash">Cash</Option>
												<Option value="card">Card</Option>
												<Option value="cheque">Cheque</Option>
												<Option value="others">Others</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Date">
										{getFieldDecorator('date', {
										})(
											<DatePicker />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Bank Name">
										<Input placeholder="bank name" />
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Cheque Number">
										<Input placeholder="cheque number" />
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Bank Name">
										<Input placeholder="bank name" />
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Transaction Id">
										<Input placeholder="transaction id" />
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Name of Mode">
										<Input placeholder="mode name" />
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Transaction Id">
										<Input placeholder="transaction id" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Divider />
									<h3>Installment Detail</h3>
									<Divider />
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Next Installment Date">
										{getFieldDecorator('nextInstallmentDate', {
										})(
											<DatePicker />
										)}
									</Form.Item>
								</Col>
								<Col span={24}>
									<Row type="flex" justify="end">
										<Form.Item>
											<Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading}>
												Click me!
											</Button>
										</Form.Item>
									</Row>
								</Col>
							</Form>
						</Col>
						<Col className="p-1" xs={0} md={{ offset: 1, span: 6 }} style={{ border: 'thick double #00bcd4' }}>
							<Form layout="vertical">
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Base Fee">
										<Input disabled defaultValue="20000" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Total Discount Amount">
										<Input disabled defaultValue="2300" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Discount Reason">
										<Input disabled defaultValue="50OFF + Additional" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Net Fee">
										<Input disabled defaultValue="19345" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Tax/GST">
										<Input disabled defaultValue="0" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Gross Fee">
										<Input disabled defaultValue="19345" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										{...disabledFormItemLayout}
										label="Pending Balance">
										<Input disabled defaultValue="10000" />
									</Form.Item>
								</Col>
							</Form>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'add-discount' })(AddStudent);
