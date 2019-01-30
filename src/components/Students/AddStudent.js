import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const { Option } = Select;

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

const colLayout = {
	xs: 24,
	lg: 12
};

class AddStudent extends Component {
	state = {
		modeOfPayment: 'cash',
		baseFee: 0,
		discountInfo: {
			code: '',
			amount: 0,
			isPercent: false
		},
		additionalDiscount: 0,
		gstPercentage: 0,
		feeCollected: 0
	};

	getBaseFee = courseId => {
		// TODO: Handle this error
		const courseInfo = this.props.courses.find(course => course._id === courseId);
		if (Boolean(courseInfo) === false) return 0;
		return courseInfo.fees;
	}

	calcDiscountAmount = (baseFee, discountAmount, isPercent) => {
		if (isPercent) return baseFee * (discountAmount / 100);
		return discountAmount;
	}

	calcNetFee = (baseFee, discountAmount, additionalDiscount) => {
		return baseFee - (discountAmount + additionalDiscount)
	}

	getTotalDiscountAmount = () => {
		const { additionalDiscount, baseFee, discountInfo } = this.state;
		const discountAmount = this.calcDiscountAmount(baseFee, discountInfo.amount, discountInfo.isPercent);
		return discountAmount + additionalDiscount;
	}

	getDiscountReason = () => {
		const { additionalDiscount, baseFee, discountInfo } = this.state;
		let amountReason = '';
		let additionalReason = '';
		const code = discountInfo.code.toUpperCase();
		const discountAmount = this.calcDiscountAmount(baseFee, discountInfo.amount, discountInfo.isPercent);
		if (discountAmount) amountReason = `${code}(${discountAmount})`;
		if (additionalDiscount) additionalReason = `ADDITIONAL(${additionalDiscount})`;
		if (amountReason && additionalReason) return amountReason + ' + ' + additionalReason;
		if (amountReason) return amountReason;
		if (additionalReason) return additionalReason;
		return '';
	}

	getNetFee = () => {
		const { additionalDiscount, baseFee, discountInfo } = this.state;
		const discountAmount = this.calcDiscountAmount(baseFee, discountInfo.amount, discountInfo.isPercent);
		return this.calcNetFee(baseFee, discountAmount, additionalDiscount);
	}

	getTaxAmount = () => {
		const { additionalDiscount, baseFee, discountInfo, gstPercentage } = this.state;
		const discountAmount = this.calcDiscountAmount(baseFee, discountInfo.amount, discountInfo.isPercent);
		const netFee = this.calcNetFee(baseFee, discountAmount, additionalDiscount);
		let tax = netFee * (gstPercentage / 100);
		if (tax < 0) tax = 0;
		return tax;
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	handleModeOfPaymentChange = value => this.setState({ modeOfPayment: value })

	handleCourseChange = ([courseId]) => {
		if (Boolean(courseId) === false) {
			this.setState({ baseFee: 0, gstPercentage: 0 });
			return;
		}
		const courseInfo = this.props.courses.find(course => course._id === courseId);
		if (Boolean(courseInfo) === false) throw new Error('Course with this id could not be found');
		const { fees, gstPercentage } = courseInfo;
		this.setState({ baseFee: fees, gstPercentage });
	}

	handleDiscountCodeChange = discountId => {
		if (Boolean(discountId) === false) {
			this.setState({ discountInfo: { code: '', amount: 0, isPercent: false } });
			return;
		}
		const discountInfo = this.props.discounts.find(discount => discount._id === discountId);
		if (Boolean(discountInfo) === false) throw new Error('Discount with this id could not be found');
		const { amount, code, isPercent } = discountInfo;
		this.setState({ discountInfo: { amount, code, isPercent } });
	}

	handleAdditionalDiscountChange = additionalDiscount => {
		additionalDiscount = additionalDiscount || 0;
		this.setState({ additionalDiscount });
	}

	handleFeeCollectedChange = feeCollected => {
		feeCollected = feeCollected || 0;
		this.setState({ feeCollected });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { batches, courses, discounts } = this.props;
		const { baseFee, discountAmount, additionalDiscount, tax } = this.state;

		const coursesAndbatchesOpts = courses.map(course => (
			{
				value: course._id,
				label: course.code,
				children: batches.filter(batch => batch.courseId === course._id).map(batch => (
					{
						value: batch._id,
						label: batch.code
					}
				))
			}
		));

		return (
			<>
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit}>
						<Row>
							<Col xs={24} md={17}>
								<Col span={24}>
									<h3>Compulsary Fields</h3>
									<Divider />
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Roll No"
										hasFeedback={true}>
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
										hasFeedback={true}>
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
										hasFeedback={true}>
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
										label="Student Address"
										hasFeedback={true}>
										{getFieldDecorator('address', {
										})(
											<Input placeholder="student address" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Student Phone No."
										hasFeedback={true}>
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
										label="Select Course and Batch"
										hasFeedback={true}>
										{getFieldDecorator('courseAndBatch', {
										})(
											<Cascader
												options={coursesAndbatchesOpts}
												changeOnSelect
												onChange={this.handleCourseChange} />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Discount Code"
										hasFeedback={true}>
										{getFieldDecorator('discountCode', {
										})(
											<Select allowClear={true} onChange={this.handleDiscountCodeChange} placeholder="select discount code">
												{discounts.map(discount => <Option key={discount._id} value={discount._id}>{discount.code}</Option>)}
											</Select>
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Additional Discount"
										hasFeedback={true}>
										{getFieldDecorator('additionalDiscount')(
											<InputNumber className="w-100" step={100} min={0} onChange={this.handleAdditionalDiscountChange} />
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
										hasFeedback={true}>
										{getFieldDecorator('feeCollected')(
											<InputNumber className="w-100" step={500} min={0} formatter={value => `₹${value}`} />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Mode Of Payment"
										hasFeedback={true}>
										{getFieldDecorator('modeOfPayment', {
											initialValue: this.state.modeOfPayment
										})(
											<Select onChange={this.handleModeOfPaymentChange}>
												<Option value="cash">Cash</Option>
												<Option value="card">Card</Option>
												<Option value="cheque">Cheque</Option>
												<Option value="other">Others</Option>
											</Select>
										)}
									</Form.Item>
								</Col>
								{this.state.modeOfPayment === 'cheque' &&
									<>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Date"
												hasFeedback={true}>
												{getFieldDecorator('dateOfCheque', {
												})(
													<DatePicker />
												)}
											</Form.Item>
										</Col>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Bank Name"
												hasFeedback={true}>
												{getFieldDecorator('bank', {
												})(
													<Input placeholder="bank name" />
												)}
											</Form.Item>
										</Col>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Cheque Number"
												hasFeedback={true}>
												{getFieldDecorator('chequeNumber', {
												})(
													<Input placeholder="cheque number" />
												)}
											</Form.Item>
										</Col>
									</>
								}
								{this.state.modeOfPayment === 'card' &&
									<>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Bank Name"
												hasFeedback={true}>
												{getFieldDecorator('bank', {
												})(
													<Input placeholder="bank name" />
												)}
											</Form.Item>
										</Col>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Transaction Id"
												hasFeedback={true}>
												{getFieldDecorator('transactionId', {
												})(
													<Input placeholder="transaction id" />
												)}
											</Form.Item>
										</Col>
									</>
								}
								{this.state.modeOfPayment === 'other' &&
									<>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Name of Mode"
												hasFeedback={true}>
												{getFieldDecorator('modeOfPayment', {
												})(
													<Input placeholder="mode name" />
												)}
											</Form.Item>
										</Col>
										<Col {...colLayout}>
											<Form.Item
												{...formItemLayout}
												label="Transaction Id"
												hasFeedback={true}>
												{getFieldDecorator('transactionId', {
												})(
													<Input placeholder="transaction id" />
												)}
											</Form.Item>
										</Col>
									</>
								}
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
							</Col>
							<Col className="p-1" xs={24} md={{ offset: 1, span: 6 }} style={{ border: 'thick double #00bcd4' }}>
								<Row>
									<Col span={24}>
										<Form.Item
											label="Base Fee">
											<Input disabled value={this.state.baseFee} />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											label="Total Discount Amount">
											<Input disabled value={this.getTotalDiscountAmount()} />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											label="Discount Reason">
											<Input disabled value={this.getDiscountReason()} />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											label="Net Fee">
											<Input disabled value={this.getNetFee()} />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											label="Tax/GST">
											<Input disabled value={this.getTaxAmount()} />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											label="Gross Fee">
											<Input disabled value={this.getNetFee() + this.getTaxAmount()} />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											label="Pending Balance">
											<Input disabled value={(this.getNetFee() + this.getTaxAmount()) - this.state.feeCollected} />
										</Form.Item>
									</Col>
								</Row>
							</Col>
							<Col xs={24}>
								<Row type="flex" justify="end">
									<Form.Item>
										<Divider />
										<Button type="primary" htmlType="submit">
											Add Student
										</Button>
									</Form.Item>
								</Row>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		courses: state.course.courses,
		discounts: state.discount.discounts,
		students: state.student.students
	};
}

export default compose(Form.create({ name: 'add-student' }), connect(mapStateToProps))(AddStudent);
