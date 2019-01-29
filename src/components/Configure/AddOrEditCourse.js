import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addCourse, editCourse } from '../../redux/actions/courseActions';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import Navbar from '../Navbar';
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
const { TextArea } = Input;


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

const calculateTotalFee = (fees, gst) => {
	fees = parseFloat(fees);
	gst = parseFloat(gst);
	return fees + (fees * (gst / 100));
};


class AddCourse extends Component {
	state = {
		courseInfo: {},
		inclusiveOfTaxes: false,
		totalFees: 0
	}

	validateGst = (rule, value, callback) => value < 0 ? callback('GST must be more than 0%') : callback();

	handleFeeChange = fees => {
		const { form } = this.props;
		const gst = form.getFieldValue('gstPercentage') || 0;
		this.setState({ totalFees: calculateTotalFee(fees, gst) });
	}

	handleGstChange = gst => {
		const { form } = this.props;
		const fees = form.getFieldValue('fees') || 0;
		this.setState({ totalFees: calculateTotalFee(fees, gst) });
	}

	handleInclusiveTaxChange = e => {
		const { form } = this.props;
		const isChecked = e.target.checked;
		if (isChecked) this.props.form.setFieldsValue({ 'gstPercentage': 0 });
		const fees = form.getFieldValue('fees') || 0;
		const gst = form.getFieldValue('gstPercentage') || 0;
		this.setState({ inclusiveOfTaxes: isChecked, totalFees: calculateTotalFee(fees, gst) });
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, addCourse, editCourse, history, edit, match } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			edit ? editCourse(match.params.courseId, values) : addCourse(values);
			history.goBack();
		});
	}

	static getDerivedStateFromProps(props, state) {
		if (props.edit === false) return state;
		const { courseId } = props.match.params;
		const courseInfo = props.courses.find(courseObj => courseObj._id === courseId);
		// TODO: Implement loading for condition below
		if (courseInfo === undefined) return state;
		// Don't update totalfee if there is no change in course info as it will override "onChange" changes
		if (JSON.stringify(courseInfo) === JSON.stringify(state.courseInfo)) return state;
		const { fees = 0 } = courseInfo;
		const { gstPercentage = 0 } = courseInfo;
		const totalFees = calculateTotalFee(fees, gstPercentage);
		return { ...state, courseInfo, totalFees };
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { code, fees, gstPercentage, description } = this.state.courseInfo;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Col span={24}>
							<h3>{this.props.edit ? 'Edit Course:' : 'Add Course:'}</h3>
						</Col>
						<Divider />
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Course Code"
								hasFeedback={true}>
								{getFieldDecorator('code', {
									initialValue: code,
									rules: [{
										required: true, message: 'Your course must have code!'
									}]
								})(
									<Input placeholder="course code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Course Fee"
								hasFeedback={true}>
								{getFieldDecorator('fees', {
									initialValue: fees,
									rules: [{
										required: true, message: 'Your course must have fee!'
									}]
								})(
									<InputNumber onChange={this.handleFeeChange} className="w-100" decimalSeparator="." precision={2} step={1000} min={0} max={10000000} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Description"
								hasFeedback={true}>
								{getFieldDecorator('description', { initialValue: description })(
									<TextArea rows={4} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="GST %"
								hasFeedback={true}>
								{getFieldDecorator('gstPercentage', {
									initialValue: gstPercentage,
									rules: [{ validator: this.validateGst }]
								})(
									<InputNumber disabled={this.state.inclusiveOfTaxes} onChange={this.handleGstChange} className="w-100" formatter={value => `${value}%`} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item {...tailFormItemLayout}>
								<Checkbox onChange={this.handleInclusiveTaxChange}>Inclusive Of Taxes</Checkbox>
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Total Fee">
								<Input value={this.state.totalFees} disabled />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button htmlType="submit" type="primary">
										{this.props.edit ? 'Edit Course' : 'Add Course'}
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
		courses: state.course.courses
	};
}

export default compose(Form.create({ name: 'add-course' }), withRouter, connect(mapStateToProps, { addCourse, editCourse }))(AddCourse);
