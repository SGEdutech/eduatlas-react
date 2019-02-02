import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../Navbar';

import { addStudent, addPayment, addInstallment } from '../../redux/actions/studentActions';
import sanatizeFormObj from '../../scripts/sanatize-form-obj';

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
		couseCode: '',
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
		return baseFee - (discountAmount + additionalDiscount);
	}

	getTotalDiscountAmount = () => {
		const { baseFee, discountInfo } = this.state;
		let { additionalDiscount } = this.state;
		let discountAmount = this.calcDiscountAmount(baseFee, discountInfo.amount, discountInfo.isPercent);
		discountAmount = parseInt(discountAmount, 10) || 0;
		additionalDiscount = parseInt(additionalDiscount, 10) || 0;
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
		if (Boolean(tax) === false || tax < 0) tax = 0;
		return tax;
	}

	handleModeOfPaymentChange = value => this.setState({ modeOfPayment: value });

	handleCourseChange = ([courseId]) => {
		if (Boolean(courseId) === false) {
			this.setState({ baseFee: 0, gstPercentage: 0 });
			return;
		}
		const courseInfo = this.props.courses.find(course => course._id === courseId);
		if (Boolean(courseInfo) === false) throw new Error('Course with this id could not be found');
		const { code, fees, gstPercentage } = courseInfo;
		this.setState({ baseFee: fees, gstPercentage, courseCode: code });
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

	injectBatchInfo = values => {
		if (Boolean(values.courseAndBatch) === false) return;
		const [courseId, batchId] = values.courseAndBatch;
		if (Boolean(batchId) === false) return;
		values.batchInfo = { courseId, batchId };
	}

	injectInstallmentInfo = values => {
		if (values.payments === undefined) throw new Error('Payment not initiated');
		const installmentRegex = new RegExp('^feeCollected$|^modeOfPayment$|^bank$|^dateOfCheque$|^chequeNumber$|^cardNumber$|^transactionId$');
		const installments = values.payments[0].installments;
		const installmentObj = {};
		const keys = Object.keys(values);
		keys.forEach(key => {
			if (installmentRegex.test(key) === false) return;
			installmentObj[key] = values[key];
			delete values[key];
		});
		if (Object.keys(installmentObj).length === 0) return false;
		installments.push(installmentObj);
		return true;
	}

	// Destructive- removes courses and batches field
	injectPaymentInfo = values => {
		const paymentRegex = new RegExp('^courseCode$|^courseFee$|^taxAmount$|^discountAmount$|^discountReason$|^nextInstallmentDate$|^$|^$');
		const keys = Object.keys(values);
		const paymentObj = { installments: [] };
		keys.forEach(key => {
			if (paymentRegex.test(key) === false) return;
			paymentObj[key] = values[key];
			delete values[key];
		});
		if (values.courseAndBatch) {
			const [courseId] = values.courseAndBatch;
			if (courseId) paymentObj.courseId = courseId;
			delete values.courseAndBatch;
		}
		values.payments = [paymentObj];
	}

	// initAddPayment = sanatizedValues => {
	// 	this.injectBatchInfo(sanatizedValues);
	// 	const isPaymentInitiated = this.injectPaymentInfo(sanatizedValues);
	// 	if (isPaymentInitiated) this.injectInstallmentInfo(sanatizedValues);

	// }

	initAddInstallment = values => {
		const { addInstallment, match: { params: { studentId, paymentId } } } = this.props;
		const installment = values.payments[0].installments[0];
		addInstallment(studentId, paymentId, installment);
	}

	initAddPayment = values => {
		const { addPayment, match: { params: { studentId } } } = this.props;
		const payment = values.payments[0];
		addPayment(studentId, payment);
	}

	initAddStudent = values => {
		const { addStudent } = this.props;
		addStudent(values);
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, task } = this.props;
		const { resetFields } = form;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			this.injectBatchInfo(values);
			this.injectPaymentInfo(values);
			this.injectInstallmentInfo(values);
			if (task === 'add-installment') {
				this.initAddInstallment(values);
			} else if (task === 'add-payment') {
				this.initAddPayment(values);
			} else {
				this.initAddStudent(values);
			}
			resetFields();
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { batches, courses, discounts, task } = this.props;

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

		const studentInputs = (
			task !== 'add-payment' && task !== 'add-installment' &&
			<>
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
								type: 'email', message: 'The input is not valid E-mail!'
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
						label="Address"
						hasFeedback={true}>
						{getFieldDecorator('address', {
						})(
							<Input placeholder="Student Address" />
						)}
					</Form.Item>
				</Col>
				<Col {...colLayout}>
					<Form.Item
						{...formItemLayout}
						label="Contact Number"
						hasFeedback={true}>
						{getFieldDecorator('contactNumber', {
						})(
							<InputNumber className="w-100" placeholder="student number" />
						)}
					</Form.Item>
				</Col>
			</>
		);

		const paymentInputs = (
			task !== 'add-installment' &&
			<>
				<Col span={24}>
					<Divider />
					<h3>Payment Details</h3>
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
						<Select allowClear={true} onChange={this.handleDiscountCodeChange} placeholder="select discount code">
							{discounts.map(discount => <Option key={discount._id} value={discount._id}>{discount.code}</Option>)}
						</Select>
					</Form.Item>
				</Col>
				<Col {...colLayout}>
					<Form.Item
						{...formItemLayout}
						label="Additional Discount"
						hasFeedback={true}>
						<InputNumber className="w-100" step={100} min={0} onChange={this.handleAdditionalDiscountChange} />
					</Form.Item>
				</Col>
				<Col {...colLayout}>
					<Form.Item
						{...formItemLayout}
						label="Next Installment Date"
						hasFeedback={true}>
						{getFieldDecorator('nextInstallmentDate', {
						})(
							<DatePicker className="w-100" />
						)}
					</Form.Item>
				</Col>
			</>
		);

		const installmentInputs = (
			<>
				<Col span={24}>
					<Divider />
					<h3>Installment Details</h3>
					<Divider />
				</Col>
				<Col {...colLayout}>
					<Form.Item
						{...formItemLayout}
						label="Fee Collected"
						hasFeedback={true}>
						{getFieldDecorator('feeCollected')(
							<InputNumber className="w-100" step={500} min={0} onChange={this.handleFeeCollectedChange} formatter={value => `₹${value}`} />
						)}
					</Form.Item>
				</Col>
				<Col {...colLayout}>
					<Form.Item
						{...formItemLayout}
						label="Mode Of Payment"
						hasFeedback={true}>
						{getFieldDecorator('modeOfPayment', {
							// initialValue: this.state.modeOfPayment
						})(
							<Select onChange={this.handleModeOfPaymentChange} placeholder="select mode">
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
			</>
		);

		const dynamicInputs = (
			task !== 'add-installment' &&
			<>
				<Row className="p-1" style={{ border: 'thick double #00bcd4' }}>
					<Col span={24}>
						<Form.Item
							label="Course Code">
							{getFieldDecorator('courseCode', { initialValue: this.state.courseCode })(
								<Input readOnly={true} />
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Base Fee">
							{getFieldDecorator('courseFee', { initialValue: this.state.baseFee })(
								<Input readOnly />
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Total Discount Amount">
							{getFieldDecorator('discountAmount', { initialValue: this.getTotalDiscountAmount() })(
								<Input readOnly />
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Discount Reason">
							{getFieldDecorator('discountReason', { initialValue: this.getDiscountReason() })(
								<Input readOnly />
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Net Fee">
							<Input readOnly value={this.getNetFee()} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="Tax/GST">
							{getFieldDecorator('taxAmount', { initialValue: this.getTaxAmount() })(
								<Input readOnly />
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Gross Fee">
							<Input readOnly value={this.getNetFee() + this.getTaxAmount()} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Pending Balance">
							<Input readOnly value={(this.getNetFee() + this.getTaxAmount()) - this.state.feeCollected} />
						</Form.Item>
					</Col>
				</Row>
			</>
		);

		return (
			<>
				{(task === 'add-payment' || task === 'add-installment') && <Navbar renderBackBtn={true} />}
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit}>
						<Row>
							<Col xs={24} md={17}>
								{/* TODO: */}
								{/* Static Inputs */}
								{studentInputs}
								{paymentInputs}
								{installmentInputs}
							</Col>
							<Col xs={24} md={{ offset: 1, span: 6 }}>
								{/* Dynamic Inputs */}
								{dynamicInputs}
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

export default compose(Form.create({ name: 'add-student' }), withRouter, connect(mapStateToProps, { addStudent, addPayment, addInstallment }))(AddStudent);
