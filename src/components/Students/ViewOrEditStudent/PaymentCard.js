import moment from 'moment';

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import InstallmentPanel from './PaymentCard/InstallmentPanel';

import sanatizeFormObj from '../../../scripts/sanatize-form-obj';

import {
	Button,
	Card,
	Col,
	Collapse,
	DatePicker,
	Form,
	Icon,
	Input,
	InputNumber,
	Row
} from 'antd';
const { Panel } = Collapse;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 7 },
		md: { span: 9 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 14 },
		md: { span: 12 }
	}
};

const colLayout = {
	xs: 24,
	md: 12
};

class PaymentCard extends Component {
	state = {
		editable: false,
		courseFee: 0,
		discountAmount: 0,
		taxAmount: 0
	}

	getTotalFeeCollected = installments => {
		let totalFeeCollected = 0;
		installments.forEach(({ feeCollected }) => totalFeeCollected += feeCollected);
		return totalFeeCollected;
	}

	handleEditBtnClick = () => this.setState({ editable: true });

	handleCancelBtnClick = () => {
		const { resetFields } = this.props.form;
		this.setState({ editable: false });
		resetFields();
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, editPayment, payment: { _id: paymentId } } = this.props;
		const { resetFields } = form;
		const { studentId } = this.props.match.params;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			editPayment(studentId, paymentId, values);
			this.setState({ editable: false });
			resetFields();
		});
	}

	static getDerivedStateFromProps(props, state) {
		const payment = props.payment || {};
		const { courseFee = 0, discountAmount = 0, taxAmount = 0 } = payment;
		return { ...state, courseFee, discountAmount, taxAmount };
	}

	render() {
		const { editable } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { _id, courseCode, courseFee, taxAmount = 0, discountAmount = 0, discountReason, installments } = this.props.payment;
		const nextInstallmentDate = moment(this.props.payment.nextInstallmentDate);
		const totalFeeCollected = this.getTotalFeeCollected(installments);
		return (
			<>
				<Card className="mb-3">
					<Form onSubmit={this.handleSubmit}>
						<Col {...colLayout} className={this.state.editable ? 'd-none' : undefined}>
							<Form.Item
								{...formItemLayout}
								label="Course Code"
								hasFeedback={editable}>
								<Input disabled={true} value={courseCode} />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Course Fee"
								hasFeedback={editable}>
								{getFieldDecorator('courseFee', {
									initialValue: courseFee,
									rules: [{
										required: editable, message: 'Please input fee!'
									}]
								})(
									<InputNumber className="w-100" disabled={!editable} step={500} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Amount"
								hasFeedback={editable}>
								{getFieldDecorator('discountAmount', {
									initialValue: discountAmount
								})(
									<InputNumber className="w-100" disabled={!editable} step={100} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Reason"
								hasFeedback={editable}>
								{getFieldDecorator('discountReason', {
									initialValue: discountReason
								})(
									<Input disabled={!editable} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout} className={this.state.editable ? 'd-none' : undefined}>
							<Form.Item
								{...formItemLayout}
								label="Net Fee"
								hasFeedback={editable}>
								<InputNumber className="w-100" disabled={true} value={courseFee - discountAmount} />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Tax"
								hasFeedback={editable}>
								{getFieldDecorator('taxAmount', {
									initialValue: taxAmount
								})(
									<InputNumber className="w-100" disabled={!editable} step={50} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout} className={this.state.editable ? 'd-none' : undefined}>
							<Form.Item
								{...formItemLayout}
								label="Gross Fee"
								hasFeedback={editable}>
								<InputNumber className="w-100" disabled={true} value={courseFee - discountAmount + taxAmount} />
							</Form.Item>
						</Col>
						<Col {...colLayout} className={this.state.editable ? 'd-none' : undefined}>
							<Form.Item
								{...formItemLayout}
								label="Pending Balance"
								hasFeedback={editable}>
								<Input disabled={true} placeholder="pending balance" value={(courseFee - discountAmount + taxAmount) - totalFeeCollected} />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Next Installment Date"
								hasFeedback={editable}>
								{getFieldDecorator('nextInstallmentDate', {
									initialValue: nextInstallmentDate
								})(
									<DatePicker className="w-100" disabled={!editable} />
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							{!editable ? (<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" onClick={this.handleEditBtnClick}>
										Edit
									</Button>
								</Form.Item>
							</Row>) : (<Row type="flex" justify="end">
								<Form.Item>
									<Button className="mx-3" onClick={this.handleCancelBtnClick}>
										Cancel
									</Button>
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Save Changes
									</Button>
								</Form.Item>
							</Row>)}
						</Col>
					</Form>
					<Col span={24}>
						{/* installment collapse will come here */}
						<Link to={this.props.location.pathname + '/add-installment'}><Button className="mb-3" type="dashed" block={true}><Icon type="plus-circle" />Add New Installment</Button></Link>
						<Collapse>
							{installments && installments.map((installment, index) => (
								<Panel key={installment._id} header={'Installment ' + (index + 1)}>
									<InstallmentPanel index={index} paymentId={_id} installment={installment} editInstallment={this.props.editInstallment} key={installment._id} />
								</Panel>
							))}
						</Collapse>
					</Col>
				</Card>
			</>
		);
	}
}

export default compose(Form.create({ name: 'add-course' }), withRouter)(PaymentCard);
