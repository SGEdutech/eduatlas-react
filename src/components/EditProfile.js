import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { editProfile, getUserInfo } from '../redux/actions/userActions';

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

class EditProfile extends Component {
	componentDidMount() {
		const { getUserInfo } = this.props;
		getUserInfo();
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(values, 'received values')
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Col span={24}>
							<h3>Personal Info</h3>
							<Divider />
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="First Name"
								hasFeedback={true}>
								{getFieldDecorator('firstName', {
									rules: [{
										required: true, message: 'Please provide name!'
									}]
								})(
									<Input placeholder="first name" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Middle Name"
								hasFeedback={true}>
								{getFieldDecorator('middleName')(
									<Input placeholder="middle name" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Last Name"
								hasFeedback={true}>
								{getFieldDecorator('lastName')(
									<Input placeholder="last name" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Primary Email"
								hasFeedback={true}
								// validateStatus="warning"
								help="can't be changed">
								{getFieldDecorator('primaryEmail', {
									rules: [{
										type: 'email', message: 'Not valid E-mail!',
									}]
								})(
									<Input readOnly />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Secondary Email"
								hasFeedback={true}>
								{getFieldDecorator('secondaryEmail', {
									rules: [{
										type: 'email', message: 'Not valid E-mail!',
									}]
								})(
									<Input placeholder="secondary email" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Address Line 1"
								hasFeedback={true}>
								{getFieldDecorator('addressLine1')(
									<Input placeholder="line 1" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Address Line 2"
								hasFeedback={true}>
								{getFieldDecorator('addressLine2')(
									<Input placeholder="line 2" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="City"
								hasFeedback={true}>
								{getFieldDecorator('city')(
									<Input placeholder="city" />
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Edit Profile
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

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default compose(Form.create({ name: 'edit-profile' }), withRouter, connect(mapStateToProps, { editProfile, getUserInfo }))(EditProfile);
