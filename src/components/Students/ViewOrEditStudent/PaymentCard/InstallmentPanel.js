import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import sanatizeFormObj from '../../../../scripts/sanatize-form-obj';

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
		editable: false,
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
		const { getFieldDecorator } = this.props.form;
		const { installment } = this.props;
		const { feeCollected, modeOfPayment, bank, dateOfCheque, chequeNumber, cardNumber, transactionId, createdAt } = installment;
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
				</Row>
			</Form>
		);
	}
}

export default compose(Form.create({ name: 'edit-payment' }), withRouter)(InstallmentCollapse);
