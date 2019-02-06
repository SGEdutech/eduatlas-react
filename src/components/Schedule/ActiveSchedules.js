import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ScheduleCard from './ActiveSchedules/ScheduleCard';

import { deleteSchedule } from '../../redux/actions/scheduleActions';
import { inverseMinutesFromMidnight } from '../../scripts/minutesToMidnight';

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

const confirm = Modal.confirm;
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

	render() {
		const { batches, schedules, messageInfo, isAttendance } = this.props;
		const schdulesJsx = schedules.map(({ _id, date, faculty, topic, fromTime, toTime, courseId, batchId }) => (
			<Col {...cardColLayout} key={_id}>
				<ScheduleCard
					id={_id}
					date={date}
					faculty={faculty}
					topic={topic}
					fromTime={inverseMinutesFromMidnight(fromTime)}
					toTime={inverseMinutesFromMidnight(toTime)}
					courseId={courseId}
					batchId={batchId}
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
						<Skeleton loading={true} active>
						</Skeleton>
					</Card>
				</Col>
			);
		}

		return (
			<div className="container">
				<Row className="mb-3" type="flex" align="middle" justify="center">
					<Col span={24} className="p-1">
						<Select placeholder="select batch" className="w-100">
							{batches.map(course => <Option key={course._id} value={course._id}>{course.code}</Option>)}
						</Select>
					</Col>
					<Col {...colLayout} className="p-1">
						<DatePicker className="w-100" />
					</Col>
					<Col {...colLayout} className="p-1">
						<DatePicker className="w-100" />
					</Col>
				</Row>
				<Row gutter={16}>
					{messageInfo.fetching ? skeletonCards : (schedules.length === 0 ? emptyJsx : schdulesJsx)}
				</Row>
			</div>
		)
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
