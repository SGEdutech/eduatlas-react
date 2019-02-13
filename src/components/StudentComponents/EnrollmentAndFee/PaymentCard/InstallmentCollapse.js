import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

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
	}

	render() {
		const { installment } = this.props;
		const { feeCollected, modeOfPayment, bank, dateOfCheque, chequeNumber, cardNumber, transactionId, createdAt } = installment;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={16}>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Mode Of Payment">
							<Select className="w-100" disabled={true} onChange={this.handleModeOfPaymentChange}>
								<Option value="cash">Cash</Option>
								<Option value="card">Card</Option>
								<Option value="cheque">Cheque</Option>
								<Option value="other">Others</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Fee Collected">
							<InputNumber className="w-100" disabled={true} />
						</Form.Item>
					</Col>
					{modeOfPayment === 'cheque' &&
						<>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Date">
									<DatePicker disabled={true} />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Bank Name">
									<Input disabled={true} />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Cheque Number">
									<Input disabled={true} />
								</Form.Item>
							</Col>
						</>
					}
					{modeOfPayment === 'card' &&
						<>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Bank Name">
									<Input disabled={true} />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Transaction Id">
									<Input disabled={true} />
								</Form.Item>
							</Col>
						</>
					}
					{modeOfPayment === 'other' &&
						<>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Name of Mode">
									<Input disabled={true} />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Transaction Id"
									>
									<Input disabled={true} />
								</Form.Item>
							</Col>
						</>
					}
				</Row>
			</Form>
		);
	}
}

export default compose(Form.create({ name: 'edit-payment' }), withRouter)(InstallmentCollapse);
