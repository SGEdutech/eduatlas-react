import React, { Component } from 'react';

import PaymentCard from './EnrollmentAndFee/PaymentCard';

import {
	Avatar,
	Card,
	Col,
	Divider,
	Form,
	Icon,
	Input,
	InputNumber,
	Row
} from 'antd';
const { Meta } = Card;

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

class EnrollmentAndFee extends Component {
	state = {
		studentInfo: {},
	}

	render() {
		const { primaryEmail } = this.props.user;

		const { name, rollNumber, email, contactNumber, address, payments } = this.state.studentInfo;

		return (
			<div className="container">
				<Row gutter={16}>
					<Col className="pt-3">
						<Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={<span className="text-capitalize" style={{ fontWeight: 'bold' }}>{name}</span>}
							description={<small>EA ID: DWAD2324DAD</small>}
						/>
						<Divider orientation="left"><small>Personal Details<Icon type="arrow-down" /></small></Divider>
					</Col>
					<Col>
						<Form className="pt-3">
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Name">
									<Input disabled={true} placeholder="name of student" />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Email">
									<Input disabled={true} placeholder="email of student" />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Roll Number">
									<Input disabled={true} placeholder="roll-number" />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Phone Number">
									<InputNumber disabled={true} className="w-100" max={99999999999} />
								</Form.Item>
							</Col>
							<Col {...colLayout}>
								<Form.Item
									{...formItemLayout}
									label="Address">
									<Input disabled={true} />
								</Form.Item>
							</Col>
						</Form>
						<Divider orientation="left"><small>Course Payments<Icon type="arrow-down" /></small></Divider>
					</Col>
					<Col className="mb-3">
						{payments && payments.map(payment => <PaymentCard courses={this.props.courses} payment={payment} editPayment={this.props.editPayment} editInstallment={this.props.editInstallment} key={payment._id} />)}
					</Col>
				</Row>
			</div>
		);
	}
}

export default EnrollmentAndFee;

