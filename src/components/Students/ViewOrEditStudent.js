import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';

import { editStudent, editPayment, editInstallment } from '../../redux/actions/studentActions';

import Navbar from '../Navbar';
import PaymentCard from './ViewOrEditStudent/PaymentCard';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import {
	Avatar,
	Button,
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

class ViewOrEditStudent extends Component {
	state = {
		studentInfo: {},
		editable: false
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}

	handleEditBtnClick = e => this.setState({ editable: true });

	handleCancelBtnClick = e => {
		const { resetFields } = this.props.form;
		this.setState({ editable: false });
		resetFields();
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, editStudent } = this.props;
		const { resetFields } = form;
		const { studentId } = this.props.match.params;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			editStudent(studentId, values);
			this.setState({ editable: false });
			resetFields();
		});
	}

	static getDerivedStateFromProps(props, state) {
		const { studentId } = props.match.params;
		const studentInfo = props.students.find(studentObj => studentObj._id === studentId);
		// TODO: Implement loading for condition below
		if (studentInfo === undefined) return state;
		if (JSON.stringify(studentInfo) === JSON.stringify(state.courseInfo)) return state;
		return { ...state, studentInfo };
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { name, rollNumber, email, contactNumber, address, payments } = this.state.studentInfo;
		const { editable } = this.state;

		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Row>
						<Col className="pt-3">
							<Meta
								avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title={<span className="text-capitalize" style={{ fontWeight: 'bold' }}>{name}</span>}
								description={<small>EA ID: DWAD2324DAD</small>}
							/>
							<Divider orientation="left"><small>Personal Details<Icon type="arrow-down" /></small></Divider>
						</Col>
						<Col>
							<Form onSubmit={this.handleSubmit} className="pt-3">
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Name"
										hasFeedback={editable}>
										{getFieldDecorator('name', {
											initialValue: name,
											rules: [{
												required: editable, message: 'Please give name!'
											}]
										})(
											<Input disabled={!editable} placeholder="name of student" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Email"
										hasFeedback={editable}>
										{getFieldDecorator('email', {
											initialValue: email,
											rules: [{
												type: 'email', message: 'Not a valid E-mail!',
											}, {
												required: editable, message: 'Please give email!'
											}]
										})(
											<Input disabled={!editable} placeholder="email of student" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Roll Number"
										hasFeedback={editable}>
										{getFieldDecorator('rollNumber', {
											initialValue: rollNumber,
											rules: [{
												required: editable, message: 'Please give roll-number!'
											}]
										})(
											<Input disabled={!editable} placeholder="roll-number" />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Phone Number"
										hasFeedback={editable}>
										{getFieldDecorator('contactNumber', {
											initialValue: contactNumber
										})(
											<InputNumber disabled={!editable} className="w-100" max={99999999999} />
										)}
									</Form.Item>
								</Col>
								<Col {...colLayout}>
									<Form.Item
										{...formItemLayout}
										label="Address"
										hasFeedback={editable}>
										{getFieldDecorator('address', {
											initialValue: address
										})(
											<Input disabled={!editable} />
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
							<Divider orientation="left"><small>Course Payments<Icon type="arrow-down" /></small></Divider>
						</Col>
						<Col className="mb-3">
							<Link to={this.props.location.pathname + '/add-payment'}><Button className="mb-3" type="dashed" block={true}><Icon type="plus-circle" />Add New Payment</Button></Link>
							{payments && payments.map(payment => <PaymentCard courses={this.props.courses} payment={payment} editPayment={this.props.editPayment} editInstallment={this.props.editInstallment} key={payment._id} />)}
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({ students: state.student.students, courses: state.course.courses });

export default compose(Form.create({ name: 'edit-student' }), withRouter, connect(mapStateToProps, { editStudent, editPayment, editInstallment }))(ViewOrEditStudent);
