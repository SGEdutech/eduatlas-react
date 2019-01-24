import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addCourse } from '../../redux/actions/courseActions';

import Navbar from '../Navbar';

import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row
} from 'antd';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

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

class AddCourse extends Component {
	state = {
		courseInfo: {},
		inclusiveOfTaxes: false
	}

	validateGst = (rule, value, callback) => {
		if (value < 0) {
			callback('GST must be more than 0%');
		} else {
			callback();
		}
	}

	calculateTotalFee = (fees, gst) => fees + (fees * (gst / 100));

	updateTotalFee = (fees, gst) => {
		const form = this.props.form;
		fees = fees || form.getFieldValue('fees') || 0;
		gst = gst || form.getFieldValue('gstPercentage') || 0;
		form.setFieldsValue({ totalFees: this.calculateTotalFee(fees, gst) });
	}

	handleFeeChange = fees => {
		fees = fees || 0;
		this.updateTotalFee(fees);
	}

	handleGstChange = gst => {
		gst = gst || 0;
		this.updateTotalFee(null, gst);
	}

	handleInclusiveTaxChange = e => {
		const isChecked = e.target.checked;
		this.setState({ inclusiveOfTaxes: isChecked });
		if (isChecked) this.props.form.setFieldsValue({ 'gstPercentage': 0 });
		this.updateTotalFee();
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			this.props.addCourse(values);
			this.props.history.goBack();
		});
	}

	// FIXME: Function being called multiple times
	componentDidMount() {
		if (this.props.edit) {
			const { courseId } = this.props.match.params;
			const courseInfo = this.props.courses.find(courseObj => courseObj._id === courseId);
			// TODO: Implement loading for condition below
			if (courseInfo === undefined) {
				return;
			}
			this.setState({ courseInfo });
			this.updateTotalFee();
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { code, fees, gstPercentage, description } = this.state.courseInfo;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit}>
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
								{getFieldDecorator('totalFees')(
									<Input disabled />
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button htmlType="submit" type="primary" onClick={this.enterLoading}>
										Add Course
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

export default compose(Form.create({ name: 'add-course' }), withRouter, connect(mapStateToProps, { addCourse }))(AddCourse);
