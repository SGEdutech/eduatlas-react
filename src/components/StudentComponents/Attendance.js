import React, { Component } from 'react';
import moment from 'moment';

import AttendanceTable from './Attendance/AttendanceTable';

import {
	Col,
	Collapse,
	Row,
	Tag,
	Table
} from 'antd';

const { Panel } = Collapse;

const columns = [{
	title: 'Date',
	dataIndex: 'date',
	key: 'date',
	width: '100'
}, {
	title: 'Topic',
	dataIndex: 'topic',
	key: 'topic'
}, {
	title: 'Status',
	dataIndex: 'status',
	key: 'status',
	width: '50',
	render: status => {
		if (status === 'present') {
			return <Tag color={'green'}>Present</Tag>;
		} else if (status === 'absent') {
			return <Tag color={'volcano'}>Absent</Tag>;
		}
		return <Tag color={'blue'}>Scheduled</Tag>;
	}
}];

export default class Attendance extends Component {
	render() {
		const { batches, schedules, studentInfo } = this.props;
		const studentBatches = batches.filter(batch => Boolean(batch.students.find(student => student === studentInfo._id)));

		const panelsJsx = studentBatches.map(batch => {
			const schedulesOfThisBatch = schedules.filter(schedule => schedule.batchId === batch._id);

			schedulesOfThisBatch.sort((a, b) => {
				const daysDiff = a.date.startOf('day').diff(b.date.startOf('day'), 'days');
				if (daysDiff !== 0) return daysDiff;
				return a.fromTime > b.fromTime;
			});
			schedulesOfThisBatch.forEach(schedule => {
				// Injecting status
				if (moment().startOf('day').diff(schedule.date.startOf('day'), 'days') < 0) {
					schedule.status = 'scheduled';
				} else if (schedule.studentsAbsent.find(studentAbsent => studentAbsent === studentInfo._id)) {
					schedule.status = 'absent';
				} else {
					schedule.status = 'present';
				}
				schedule.date = schedule.date.format('DD/MM/YY');
			});


			return <Panel
				key="1"
				header={<Row>
					<Col span={12}>
						<Row>
							<Col span={24}>
								Batch
							</Col>
							<Col span={24} className="mt-1">
								<span className="display-4 text-uppercase">{batch.code}</span>
							</Col>
						</Row>
					</Col>
					<Col span={12}>
						<Row>
							<Col span={24}>
								Attendance
							</Col>
							<Col span={24} className="mt-1">
								<span className="display-4">23</span><span className="mx-1">/</span>100
							</Col>
						</Row>
					</Col>
				</Row>}>
				<Table
					rowKey="_id"
					className="mb-3"
					bordered={true}
					pagination={false}
					dataSource={schedulesOfThisBatch}
					columns={columns} />
			</Panel>;
		});

		return (
			<div className="container">
				<Collapse bordered={false}>
					{panelsJsx}
				</Collapse>
			</div>
		);
	}
}
