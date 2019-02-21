import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import { addSchedule } from '../../../redux/actions/scheduleActions';
import sanatizeFormObj from '../../../scripts/sanatize-form-obj';
import { minutesFromMidnight } from '../../../scripts/minutesToMidnight';

import {
	Button,
	Col,
	DatePicker,
	Form,
	Icon,
	Input,
	Row,
	Select
} from 'antd';

import { DatePicker as DatePickerM, List } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const { Option } = Select;

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

let id = 1;

class AddSchedule extends Component {
	state = {
		fromDate: undefined
	};

	_addDays = (date, days) => {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');
		if (typeof days !== 'number') throw new Error('Type of days must be a number');

		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result.getTime();
	}

	getDaysTillSunday = () => {
		const resultArr = [];
		let { fromDate } = this.state;
		if (fromDate === undefined) return resultArr;
		fromDate = fromDate.toDate();
		const dayIndexToDayNameMap = {
			0: 'sunday',
			1: 'monday',
			2: 'tuesday',
			3: 'wednesday',
			4: 'thursday',
			5: 'friday',
			6: 'saturday'
		};
		const givenDateIndex = fromDate.getDay();

		for (let i = givenDateIndex, numeberOfDaysPassed = 0; i < 8; i++ , numeberOfDaysPassed++) {
			const dateIndex = i % 7;
			resultArr.push({
				day: dayIndexToDayNameMap[dateIndex],
				date: this._addDays(fromDate, numeberOfDaysPassed)
			});
		}
		return resultArr;
	}

	getToDate = () => {
		const { fromDate } = this.state;
		return moment(fromDate).endOf('isoweek');
	}

	handleFromDateChange = fromDate => this.setState({ fromDate });

	calibrateFromAndToTime = values => {
		const timeRegex = new RegExp('^fromTime|^toTime');
		const keys = Object.keys(values);
		const timeKeys = keys.filter(key => timeRegex.test(key));
		timeKeys.forEach(timeKey => values[timeKey] = minutesFromMidnight(values[timeKey]));
	}

	// Time complexity is O(n^2)
	splitSchedules = values => {
		const keys = Object.keys(values);
		const schedules = values.keys.map(key => {
			const schedule = {};
			const keyRegex = new RegExp(`_${key}$`);
			const scheduleKeys = keys.filter(key => keyRegex.test(key));
			scheduleKeys.forEach(scheduleKey => schedule[scheduleKey.split('_')[0]] = values[scheduleKey]);
			return schedule;
		});
		return schedules;
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, addSchedule } = this.props;
		const { resetFields } = form;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			this.calibrateFromAndToTime(values);
			addSchedule({ schedules: this.splitSchedules(values), batches: values.batches });
			resetFields();
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
			keys: keys.filter(key => key !== k)
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

	validateToTime = (rule, value, callback) => {
		const form = this.props.form;
		callback();
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;

		getFieldDecorator('keys', { initialValue: [0] });
		const keys = getFieldValue('keys');


		const scheduleInps = keys.map((k, index) => (
			<Row key={k} type="flex" justify="space-around" align="bottom">
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						label="Day"
						hasFeedback={true}>
						{getFieldDecorator('date_' + k, {
							rules: [{
								required: true, message: 'Please choose day!'
							}]
						})(
							<Select onChange={this.handleDayChange}>
								{this.getDaysTillSunday().map(daysInfo => <Option key={daysInfo.date} value={daysInfo.date}>{daysInfo.day}</Option>)}
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						label="From Time">
						{getFieldDecorator('fromTime_' + k, {
							rules: [{ required: true, message: 'Please enter dude!' }]
						})(
							<DatePickerM
								mode="time"
								minuteStep={2}
								use12Hours={true}
								locale={enUs}>
								<List.Item style={{ border: '1px solid #D3D3D3', borderRadius: '5px' }} arrow="horizontal"></List.Item>
							</DatePickerM>
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						label="To Time">
						{getFieldDecorator('toTime_' + k, {
							validator: this.validateToTime, message: 'Must be less than From-Time'
						})(
							<DatePickerM
								mode="time"
								minuteStep={2}
								use12Hours={true}
								locale={enUs}>
								<List.Item style={{ border: '1px solid #D3D3D3', borderRadius: '5px' }} arrow="horizontal"></List.Item>
							</DatePickerM>
						)}
					</Form.Item>
				</Col>
				<Col {...scheduleColLayout} className="p-1">
					<Form.Item
						label="Topic"
						hasFeedback={true}>
						{getFieldDecorator('topic_' + k, {
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
						label="Faculty"
						hasFeedback={true}>
						{getFieldDecorator('faculty_' + k, {
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
							onClick={() => this.remove(k)} />
					</Form.Item>
				</Col>
			</Row>
		));

		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Col {...colLayout} className="p-1">
						<Form.Item
							label="From Date">
							<DatePicker format="DD-MM-YYYY" onChange={this.handleFromDateChange} className="w-100" />
						</Form.Item>
					</Col>
					<Col {...colLayout} className="p-1">
						<Form.Item
							label="To Date"
							hasFeedback={true}>
							<DatePicker value={this.getToDate()} format="DD-MM-YYYY" className="w-100" disabled={true} />
						</Form.Item>
					</Col>
					<Col className="p-1 mb-3" span={24} style={{ border: 'thick double #00bcd4' }}>
						{scheduleInps}
					</Col>
					<Col span={24}>
						<Form.Item>
							<Button type="dashed" block onClick={this.add}>
								<Icon type="plus" /> Add Another
							</Button>
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							label="Batches"
							hasFeedback={true}>
							{getFieldDecorator('batches', {
								rules: [{
									required: true, message: 'Please input batch!'
								}]
							})(
								<Select
									mode="multiple"
									placeholder="Please select batches">
									{this.props.batches &&
										this.props.batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
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

