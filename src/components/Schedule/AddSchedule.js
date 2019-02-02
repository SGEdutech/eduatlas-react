import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import { addSchedule } from '../../redux/actions/scheduleActions';
import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import {
	Button,
	Col,
	DatePicker,
	Form,
	Icon,
	Input,
	Row,
	Select,
	TimePicker
} from 'antd';

const { Option } = Select;

const formItemLayout = {
	labelCol: {
	},
	wrapperCol: {
	}
};

const formScheduleItemLayout = {
	labelCol: {
	},
	wrapperCol: {
	}
};

const colLayout = {
	xs: 24,
	md: 12,
	lg: 12
};

const scheduleColLayout = {
	xs: 24,
	md: 12,
	lg: 4
};

const children = [];
for (let i = 10; i < 36; i++) {
	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const format = 'HH:mm a';
let id = 1;

function _addDays(date, days) {
	if (date instanceof Date === false) throw new Error('Type of date must be a date');
	if (typeof days !== 'number') throw new Error('Type of days must be a number');

	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function getDaysTillSunday(date) {
	const resultArr = [];
	const dayIndexToDayNameMap = {
		0: 'sunday',
		1: 'monday',
		2: 'tuesday',
		3: 'wednesday',
		4: 'thursday',
		5: 'friday',
		6: 'saturday'
	};
	const givenDateIndex = date.getDay();

	for (let i = givenDateIndex, numeberOfDaysPassed = 0; i < 8; i++ , numeberOfDaysPassed++) {
		const dateIndex = i % 7;
		resultArr.push({
			day: dayIndexToDayNameMap[dateIndex],
			date: _addDays(date, numeberOfDaysPassed)
		});
	}
	return resultArr;
}

class AddSchedule extends Component {
	state = {
		fromDate: undefined
	};

	getToDate = () => {
		const { fromDate } = this.state;
		return moment(fromDate).endOf('isoweek');
	}

	handleDayChange = value => {
		console.log(value);
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, addDiscount, editDiscount, history, edit, match } = this.props;
		const { resetFields } = form;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			// sanatizeFormObj(values);
			console.log(values)
		});
	}

	remove = k => {
		const { form } = this.props;
		// can use data-binding to get
		const keys = form.getFieldValue('keys');
		// We need at least one passenger
		if (keys.length === 1) {
			return;
		}

		// can use data-binding to set
		form.setFieldsValue({
			keys: keys.filter(key => key !== k),
		});
	}

	add = () => {
		const { form } = this.props;
		// can use data-binding to get
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(id++);
		// can use data-binding to set
		// important! notify form to detect changes
		form.setFieldsValue({ keys: nextKeys });
	}

	handleFromDateChange = fromDate => this.setState({ fromDate });

	validateToTime = value => {
		
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { schedules } = this.props;

		getFieldDecorator('keys', { initialValue: [0] });
		const keys = getFieldValue('keys');


		const scheduleInps = keys.map((k, index) => (
			<Row key={k} type="flex" justify="space-around" align="bottom">
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						{...formScheduleItemLayout}
						label="Day"
						hasFeedback={true}>
						{getFieldDecorator('day_' + k, {
							// initialValue: code,
							rules: [{
								required: true, message: 'Please choose day!'
							}]
						})(
							<Select onChange={this.handleDayChange}>
								<Option value="jack">Sunday</Option>
								<Option value="lucy">Sunday</Option>
								<Option value="Yiminghe">Sunday</Option>
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						{...formScheduleItemLayout}
						label="From Time"
						hasFeedback={true}>
						{getFieldDecorator('fromTime_' + k)(
							<TimePicker use12Hours format={format} minuteStep={10} className="w-100" />
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						{...formScheduleItemLayout}
						label="To Time"
						hasFeedback={true}>
						{getFieldDecorator('toTime_' + k, {
							validator: this.validateToTime, message: 'Must be less than From-Time'
						})(
							<TimePicker use12Hours format={format} minuteStep={10} className="w-100" />
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						{...formScheduleItemLayout}
						label="Topic"
						hasFeedback={true}>
						{getFieldDecorator('topic_' + k, {
							// initialValue: code,
							rules: [{
								required: true, message: 'Please input topic!'
							}]
						})(
							<Input />
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						{...formScheduleItemLayout}
						label="Faculty"
						hasFeedback={true}>
						{getFieldDecorator('faculty_' + k, {
							// initialValue: code,
							rules: [{
								required: true, message: 'Please input faculty!'
							}]
						})(
							<Input />
						)}
					</Form.Item>
				</Col>
				<Col className="p-1">
					<Form.Item>
						<Icon
							className="dynamic-delete-button"
							type="minus-circle-o"
							// disabled={keys.length === 1}
							onClick={() => this.remove(k)}
						/>
					</Form.Item>
				</Col>
			</Row>
		));

		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Col {...colLayout} className="p-1">
						<Form.Item
							{...formItemLayout}
							label="From Date"
							hasFeedback={true}>
							{getFieldDecorator('fromDate', {
								// initialValue: code,
								rules: [{
									required: true, message: 'Please choose date!'
								}]
							})(
								<DatePicker onChange={this.handleFromDateChange} className="w-100" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout} className="p-1">
						<Form.Item
							{...formItemLayout}
							label="To Date"
							hasFeedback={true}>
							{getFieldDecorator('toDate')(
								<DatePicker className="w-100" disabled={true} />
							)}
						</Form.Item>
					</Col>
					<Col className="p-1 mb-3" span={24} style={{ border: 'thick double #00bcd4' }}>
						{scheduleInps}
					</Col>
					<Col span={24}>
						{/* <Row type="flex" justify="end"> */}
						<Form.Item>
							<Button type="dashed" block onClick={this.add}>
								<Icon type="plus" /> Add Another
							</Button>
						</Form.Item>
						{/* </Row> */}
					</Col>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Batches"
							hasFeedback={true}>
							{getFieldDecorator('batches', {
								// initialValue: code,
								rules: [{
									required: true, message: 'Please input faculty!'
								}]
							})(
								<Select
									mode="multiple"
									placeholder="Please select batches">
									{children}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Row type="flex" justify="end">
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Add Schedule(s)
								</Button>
							</Form.Item>
						</Row>
					</Col>
				</Form>
			</div >
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		courses: state.course.courses,
		discounts: state.discount.discounts,
		students: state.student.students
	};
}

export default compose(Form.create({ name: 'add-schedule' }), connect(mapStateToProps, { addSchedule }))(AddSchedule);

