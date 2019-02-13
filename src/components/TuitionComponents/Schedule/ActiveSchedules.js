import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ScheduleCard from './ActiveSchedules/ScheduleCard';

import { deleteSchedule } from '../../../redux/actions/scheduleActions';
import { inverseMinutesFromMidnight } from '../../../scripts/minutesToMidnight';

import {
	Card,
	Col,
	DatePicker,
	Empty,
	Modal,
	Row,
	Select,
	Skeleton
} from 'antd';

const { confirm } = Modal;
const { Option } = Select;

const colLayout = {
	xs: 24,
	md: 12
};

const cardColLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 6
};

class ActiveSchedules extends Component {
	state = {
		batchId: undefined,
		fromDate: undefined,
		toDate: undefined
	}

	showDeleteConfirm = (courseId, batchId, scheduleId) => {
		const { deleteSchedule } = this.props;
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteSchedule(courseId, batchId, scheduleId);
			}
		});
	};

	handleBatchChange = batchId => this.setState({ batchId });

	handleFromDateChange = fromDate => this.setState({ fromDate });

	handleToDateChange = toDate => this.setState({ toDate });

	getFilteredSchedules = () => {
		let { schedules } = this.props;
		const { batchId, toDate } = this.state;
		let { fromDate } = this.state;
		if (batchId) schedules = schedules.filter(schedule => schedule.batchId === batchId);
		fromDate = fromDate || moment();
		schedules = schedules.filter(schedule => {
			return schedule.date.startOf('day').diff(fromDate.startOf('day'), 'days') >= 0;
		});
		if (toDate) schedules = schedules.filter(schedule => schedule.date.startOf('day').diff(toDate.startOf('day'), 'days') <= 0);
		return schedules;
	}

	render() {
		const { batches, messageInfo, isAttendance } = this.props;
		const filteredSchedules = this.getFilteredSchedules();
		const schdulesJsx = filteredSchedules.map(({ _id, date, faculty, topic, fromTime, toTime, batchCode, courseId, batchId }) => (
			<Col {...cardColLayout} key={_id}>
				<ScheduleCard
					id={_id}
					date={date}
					faculty={faculty}
					topic={topic}
					fromTime={inverseMinutesFromMidnight(fromTime).format('LT')}
					toTime={inverseMinutesFromMidnight(toTime).format('LT')}
					courseId={courseId}
					batchId={batchId}
					batchCode={batchCode}
					isAttendance={isAttendance}
					deleteSchedule={this.showDeleteConfirm} />
			</Col>
		));


		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		const skeletonCards = [];
		for (let i = 0; i < 5; i++) {
			skeletonCards.push(
				<Col {...cardColLayout} key={i}>
					<Card className="mb-3">
						<Skeleton loading={true} active></Skeleton>
					</Card>
				</Col>
			);
		}

		return (
			<div className="container">
				<Row className="mb-3" type="flex" align="middle" justify="center">
					<Col span={24} className="p-1">
						<Select name="Something" onChange={this.handleBatchChange} placeholder="Select Batch" className="w-100">
							{batches.map(course => <Option onChange={this.handleChange} key={course._id} value={course._id}>{course.code}</Option>)}
						</Select>
					</Col>
					<Col {...colLayout} className="p-1">
						<DatePicker onChange={this.handleFromDateChange} className="w-100" />
					</Col>
					<Col {...colLayout} className="p-1">
						<DatePicker onChange={this.handleToDateChange} className="w-100" />
					</Col>
				</Row>
				<Row gutter={16}>
					{messageInfo.fetching ? skeletonCards : (filteredSchedules.length === 0 ? emptyJsx : schdulesJsx)}
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		schedules: state.schedule.schedules,
		messageInfo: state.messageInfo
	};
}

export default connect(mapStateToProps, { deleteSchedule })(ActiveSchedules);
