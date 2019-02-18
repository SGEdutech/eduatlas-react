import React, { Component } from 'react';
import moment from 'moment';

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
	dataIndex: 'parsedDate',
	key: 'parsedDate',
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

		const panelsJsx = studentBatches.map((batch, index) => {
			let schedulesOfThisBatch = schedules.filter(schedule => schedule.batchId === batch._id);

			// TODO: Further sort via time
			schedulesOfThisBatch = schedulesOfThisBatch.sort((a, b) => a.date.startOf('day').diff(b.date.startOf('day'), 'days'));

			let daysPresent = 0;
			let totalClassesPassed = 0;
			schedulesOfThisBatch.forEach(schedule => {
				// Injecting status
				if (moment().startOf('day').diff(schedule.date.startOf('day'), 'days') < 0) {
					schedule.status = 'scheduled';
				} else if (schedule.studentsAbsent.find(studentAbsent => studentAbsent === studentInfo._id)) {
					totalClassesPassed++;
					schedule.status = 'absent';
				} else {
					totalClassesPassed++;
					daysPresent++;
					schedule.status = 'present';
				}
				schedule.parsedDate = schedule.date.format('DD/MM/YY');
			});

			return <Panel
				key={index + 1}
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
								<span className="display-4">{daysPresent}</span><span className="mx-1">/</span>{totalClassesPassed}
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
