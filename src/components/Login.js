import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';

import { logIn } from '../redux/actions/userActions';

import {
	Avatar,
	Button,
	Col,
	Icon,
	Form,
	Input,
	Row
} from 'antd';

const colLayout = {
	xs: {
		span: 24
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

class Login extends Component {
	state = {};

	handleSubmit = e => {
		e.preventDefault();
		const { form, logIn, history: { push }, form: { resetFields } } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			logIn(values);
			resetFields();
			push('/');
		});
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
								{getFieldDecorator('username', {
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
										required: true, message: 'Please input your password!'
									}]
								})(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item>
								<Button type="primary" block htmlType="submit">
									Login
								</Button>
							</Form.Item>
						</Col>
						<Col {...colLayout} className="mb-3">
							<Row type="flex" justify="center">
								<Link to="/signup"> Sign-Up!</Link>
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

export default compose(Form.create({ name: 'login' }), withRouter, connect(mapStateToProps, { logIn }))(Login);
