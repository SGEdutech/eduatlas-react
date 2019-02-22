import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import sanatizeFormObj from '../../../../../scripts/sanatize-form-obj';
import { getDocDef } from '../../../../../scripts/receipt-definition';

import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Row,
	Select
} from 'antd';

const { Option } = Select;
const confirm = Modal.confirm;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

class InstallmentCollapse extends Component {
	state = {
		editable: false
	}

	handleMailReceiptBtnClick = () => {
		const { installment, match, mailReceipt, students, courseCode } = this.props;
		installment.courseCode = courseCode;
		const { studentId } = match.params;
		const studentInfo = students.find(student => studentId === student._id);
		const receiptConfig = {
			businessName: 'Shri Ram Academy', addressLine1: '23 flamingo pitampura',
			addressLine2: 'New Delhi', city: 'Delhi', pinCode: 234567,
			gstNumber: '23m234jbg234j2'
		};
		const docDefinition = getDocDef(receiptConfig, studentInfo, installment);
		mailReceipt(docDefinition, studentInfo.email);
	}

	showDeleteConfirm = (paymentId, installmentId) => {
		const { deleteInstallment, match } = this.props;
		const { studentId } = match.params;
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteInstallment(studentId, paymentId, installmentId);
			}
		});
	};

	handleDeleteBtnClick = () => {
		const { installment: { _id: installmentId }, paymentId } = this.props;
		this.showDeleteConfirm(paymentId, installmentId);
	}

	handleEditBtnClick = () => this.setState({ editable: true });

	handleCancelBtnClick = () => {
		const { resetFields } = this.props.form;
		this.setState({ editable: false });
		resetFields();
	}

	handleModeOfPaymentChange = value => this.setState({ modeOfPayment: value })

	handleSubmit = e => {
		e.preventDefault();
		const { form, editInstallment, paymentId, installment } = this.props;
		const installmentId = installment._id;
		const { resetFields } = form;
		const { studentId } = this.props.match.params;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			editInstallment(studentId, paymentId, installmentId, values);
			this.setState({ editable: false });
			resetFields();
		});
	}

	render() {
		const { form: { getFieldDecorator }, installment } = this.props;
		const { feeCollected, modeOfPayment, bank, dateOfCheque, chequeNumber, transactionId } = installment;
		const { editable } = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={16}>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Mode Of Payment"
							hasFeedback={editable}>
							{getFieldDecorator('modeOfPayment', {
								initialValue: modeOfPayment,
								rules: [{
									required: editable, message: 'Please select mode!'
								}]
							})(
								<Select className="w-100" disabled={true} onChange={this.handleModeOfPaymentChange}>
									<Option value="cash">Cash</Option>
									<Option value="card">Card</Option>
									<Option value="cheque">Cheque</Option>
									<Option value="other">Others</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Fee Collected"
							hasFeedback={editable}>
							{getFieldDecorator('feeCollected', {
								initialValue: feeCollected,
								rules: [{
									required: editable, message: 'Please give name!'
								}]
							})(
								<InputNumber className="w-100" disabled={!editable} />
							)}
						</Form.Item>
					</Col>
					{modeOfPayment === 'cheque' &&
						<>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Date"
									hasFeedback={editable}>
									{getFieldDecorator('dateOfCheque', {
										initialValue: dateOfCheque
									})(
										<DatePicker disabled={!editable} />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Bank Name"
									hasFeedback={editable}>
									{getFieldDecorator('bank', {
										initialValue: bank
									})(
										<Input disabled={!editable} />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Cheque Number"
									hasFeedback={editable}>
									{getFieldDecorator('chequeNumber', {
										initialValue: chequeNumber
									})(
										<Input disabled={!editable} />
									)}
								</Form.Item>
							</Col>
						</>
					}
					{modeOfPayment === 'card' &&
						<>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Bank Name"
									hasFeedback={editable}>
									{getFieldDecorator('bank', {
										initialValue: bank
									})(
										<Input disabled={!editable} />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Transaction Id"
									hasFeedback={editable}>
									{getFieldDecorator('transactionId', {
										initialValue: transactionId
									})(
										<Input disabled={!editable} />
									)}
								</Form.Item>
							</Col>
						</>
					}
					{modeOfPayment === 'other' &&
						<>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Name of Mode"
									hasFeedback={editable}>
									{getFieldDecorator('modeOfPayment', {
										initialValue: modeOfPayment
									})(
										<Input disabled={!editable} />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Transaction Id"
									hasFeedback={editable}>
									{getFieldDecorator('transactionId', {
										initialValue: transactionId
									})(
										<Input disabled={!editable} />
									)}
								</Form.Item>
							</Col>
						</>
					}
					<Col span={24}>
						{!editable ? (
							<>
								<Row type="flex" justify="end">
									<Form.Item>
										<Button className="mx-1" type="primary" onClick={this.handleEditBtnClick}>
											Edit
										</Button>
										<Button type="primary" onClick={this.handleDeleteBtnClick}>
											Delete
										</Button>
									</Form.Item>
								</Row>
								<Row type="flex" justify="end">
									<Form.Item>
										<Button type="primary" onClick={this.handleMailReceiptBtnClick}>
											Mail Receipt to student
										</Button>
									</Form.Item>
								</Row>
							</>
						) : (<Row type="flex" justify="end">
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
				</Row>
			</Form>
		);
	}
}

export default compose(Form.create({ name: 'edit-payment' }), withRouter)(InstallmentCollapse);
