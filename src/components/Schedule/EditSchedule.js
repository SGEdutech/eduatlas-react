import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addDiscount } from '../../redux/actions/discountActions';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import Navbar from '../Navbar';

import {
	Button,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	TimePicker
} from 'antd';
const { Option } = Select;


const format = 'h:mm a';

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

class EditSchedule extends Component {
	state = {
		scheduleInfo: {}
	};

	handleDayChange = value => {
		console.log(value);
	}


	handleSubmit = e => {
		e.preventDefault();
		const { form, addDiscount, editDiscount, history, edit, match } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			if (this.state.saveAsPercentage) {
				values.isPercent = true;
			}
			edit ? editDiscount(match.params.discountId, values) : addDiscount(values);
			history.goBack();
		});
	}

	static getDerivedStateFromProps(props, state) {
		const { scheduleId } = props.match.params;
		const scheduleInfo = props.schedules.find(scheduleObj => scheduleObj._id === scheduleId);
		// TODO: Implement loading for condition below
		if (scheduleInfo === undefined) return state;
		if (JSON.stringify(scheduleInfo) === JSON.stringify(state.scheduleInfo)) return state;
		return { ...state, scheduleInfo: scheduleInfo };
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { _id, fromTime, toTime, faculty, topic, date } = this.state.scheduleInfo;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Date"
								hasFeedback={true}>
								{getFieldDecorator('date', {
									initialValue: date,
									rules: [{
										required: true, message: 'Please choose date!'
									}]
								})(
									<DatePicker className="w-100" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="From Time">
								{getFieldDecorator('fromTime', {
									initialValue: fromTime,
									rules: [{ required: true, message: 'Please enter time!' }]
								})(
									<TimePicker use12Hours={true} format={format} minuteStep={10} className="w-100" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="To Time">
								{getFieldDecorator('toTime', {
									initialValue: toTime,
									rules: [{ required: true, message: 'Please enter time!' }]
								})(
									<TimePicker use12Hours={true} format={format} minuteStep={10} className="w-100" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Topic"
								hasFeedback={true}>
								{getFieldDecorator('topic', {
									initialValue: topic,
									rules: [{
										required: true, message: 'Please input topic!'
									}]
								})(
									<Input />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Faculty"
								hasFeedback={true}>
								{getFieldDecorator('facilty', {
									initialValue: faculty,
									rules: [{
										required: true, message: 'Please input faculty!'
									}]
								})(
									<Input />
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Edit Schedule
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
		schedules: state.schedule.schedules
	};
}

export default compose(Form.create({ name: 'edit-schedule' }), withRouter, connect(mapStateToProps, {}))(EditSchedule);
