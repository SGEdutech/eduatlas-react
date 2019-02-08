import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';

import { signUp } from '../redux/actions/userActions';

import {
	Avatar,
	Button,
	Checkbox,
	Col,
	Icon,
	Form,
	Input,
	Row,
} from 'antd';

const formItemLayout = {
	labelCol: {
	},
	wrapperCol: {
	}
};

const colLayout = {
	xs: {
		span: 24
		// offset: 8
	},
	sm: {
		span: 12,
		offset: 6
	},
	lg: {
		span: 8,
		offset: 8
	}
};

class Signup extends Component {
	state = {
		confirmDirty: false
	};

	handleSubmit = e => {
		e.preventDefault();
		const { form, signUp, history: { push }, form: { resetFields } } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			signUp(values);
			resetFields();
			push('/login');
		});
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Passwords don\'t match!');
		} else {
			callback();
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="container">
				<Row className="mt-3" type="flex" justify="center">
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={128} icon="user" />
				</Row>
				<Row className="mb-3" type="flex" justify="center">
					<h2 className="text-capitalize">IMS PITAMPURA</h2>
				</Row>
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Row gutter={16}>
						<Col {...colLayout}>
							<Form.Item
								// {...formItemLayout}
								hasFeedback={true}>
								{getFieldDecorator('firstName', {
									rules: [{
										required: true, message: 'Please provide name!'
									}]
								})(
									<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								// {...formItemLayout}
								hasFeedback={true}>
								{getFieldDecorator('primaryEmail', {
									rules: [{
										type: 'email', message: 'Not a valid E-mail!'
									},
									{
										required: true, message: 'Please provide email!'
									}]
								})(
									<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								// {...formItemLayout}
								hasFeedback={true}>
								{getFieldDecorator('password', {
									rules: [{
										required: true, message: 'Please input your password!',
									},
									{
										validator: this.validateToNextPassword,
									}]
								})(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								// {...formItemLayout}
								hasFeedback={true}>
								{getFieldDecorator('confirm', {
									rules: [{
										required: true, message: 'Please input your password again!',
									},
									{
										validator: this.compareToFirstPassword,
									}]
								})(
									<Input onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item>
								<Button type="primary" block htmlType="submit">
									Signup
								</Button>
							</Form.Item>
						</Col>
						<Col {...colLayout} className="mb-3">
							<Row type="flex" justify="center">
								<Link to="/login"> Login!</Link>
							</Row>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		discounts: state.discount.discounts
	};
}

export default compose(Form.create({ name: 'login' }), withRouter, connect(mapStateToProps, { signUp }))(Signup);
