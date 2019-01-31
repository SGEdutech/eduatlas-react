import React, { Component } from 'react';

import Navbar from './Navbar';
import TitleBar from './TitleBar';

import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row
} from 'antd';

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

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};

const colLayout = {
	xs: 24,
	md: 12
};

class EditProfile extends Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<TitleBar text={'Edit Profile'} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Col span={24}>
							<h3>{this.props.edit ? 'Edit Discount:' : 'Add Discount:'}</h3>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Code"
								hasFeedback={true}>
								{getFieldDecorator('code', {
									// initialValue: code,
									rules: [{
										required: true, message: 'Please give some name!'
									}, {
										validator: this.validateDiscountCode
									}]
								})(
									<Input placeholder="discount code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Amount"
								hasFeedback={true}>
								{getFieldDecorator('amount', {
									// initialValue: amount,
									rules: [{
										required: true, message: 'Discount must have amount!'
									}]
								})(
									<InputNumber className="w-100" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item {...tailFormItemLayout}>
								<Checkbox >Save Discount as Percentage</Checkbox>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										{this.props.edit ? 'Edit Discount' : 'Add Discount'}
									</Button>
								</Form.Item>
							</Row>
						</Col>
					</Form>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'edit-profile' })(EditProfile);
