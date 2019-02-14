import React, { Component } from 'react';

import AttendanceTable from './Attendance/AttendanceTable';

import {
	Col,
	Collapse,
	Row,
	Tag,
	Table
} from 'antd';
const { Panel } = Collapse;


export default class Attendance extends Component {
	render() {
		const { batches, schedules, studentInfo } = this.props;
		const studentBatches = batches.filter(batch => Boolean(batch.students.find(student => student === studentInfo._id)));

		const panelsJsx = studentBatches.map(batch => {
			const schedulesOfThisBatch = schedules.filter(schedule => schedule.batchId === batch._id);
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
				<AttendanceTable studentId={studentInfo._id} schedulesOfThisBatch={schedulesOfThisBatch} />
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
