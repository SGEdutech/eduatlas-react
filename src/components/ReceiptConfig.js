import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import sanatizeFormObj from '../scripts/sanatize-form-obj';

import Navbar from './Navbar';

import {
	Button,
	Checkbox,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	Row
} from 'antd';

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

class ReceiptConfig extends Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		const { businessName, addressLine1, addressLine2, city, state, pinCode, taxId } = this.props.userInfo;

		return (
			<>
				<Navbar renderBackBtn={true} navText="Receipt Config" />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Row gutter={16}>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Business Name"
									hasFeedback={true}>
									{getFieldDecorator('businessName', {
										initialValue: businessName,
										rules: [{
											required: true, message: 'Please provide name!'
										}]
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Address Line 1"
									hasFeedback={true}>
									{getFieldDecorator('addressLine1', {
										initialValue: addressLine1
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Address Line 2"
									hasFeedback={true}>
									{getFieldDecorator('addressLine2', {
										initialValue: addressLine2
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="City"
									hasFeedback={true}>
									{getFieldDecorator('city', {
										initialValue: city
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="State"
									hasFeedback={true}>
									{getFieldDecorator('state', {
										initialValue: state
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Pin Code"
									hasFeedback={true}>
									{getFieldDecorator('pinCode', {
										initialValue: pinCode
									})(
										<InputNumber />
									)}
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Tax ID/GST"
									hasFeedback={true}>
									{getFieldDecorator('taxId', {
										initialValue: taxId
									})(
										<Input />
									)}
								</Form.Item>
							</Col>
							<Col span={24}>
								<Row type="flex" justify="end">
									<Form.Item>
										<Button type="primary" htmlType="submit">
											Save Changes
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
		userInfo: state.user.userInfo
	};
}

export default compose(Form.create({ name: 'receipt-config' }), withRouter, connect(mapStateToProps, {}))(ReceiptConfig);


