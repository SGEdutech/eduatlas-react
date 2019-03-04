import moment from 'moment';
import React, { Component } from 'react';

import {
	Col,
	Collapse,
	Empty,
	Row,
	Table
} from 'antd';

const { Panel } = Collapse;

const columnsDef = [{
	title: 'Test Name/Code',
	dataIndex: 'name',
	key: 'name'
}, {
	title: 'Date',
	dataIndex: 'rollNumber',
	key: 'rollNumber',
	width: '50'
}, {
	title: 'Score',
	dataIndex: 'score',
	key: 'score',
	width: '80',
	editable: 'true'
}];

class Score extends Component {
	render() {
		const { batches, schedules, studentInfo } = this.props;
		const studentBatches = batches.filter(batch => Boolean(batch.students.find(student => student === studentInfo._id)));

		const panelsJsx = studentBatches.map((batch, index) => {
			// TODO: remove schedules and bring in scores, remove moment
			let schedulesOfThisBatch = schedules.filter(schedule => schedule.batchId === batch._id);
			schedulesOfThisBatch = schedulesOfThisBatch.sort((a, b) => a.date.startOf('day').diff(b.date.startOf('day'), 'days'));

			let daysPresent = 0;
			let totalClassesPassed = 0;
			schedulesOfThisBatch.forEach(schedule => {
				// Injecting status
				if (moment().startOf('day').diff(schedule.date.startOf('day'), 'days') < 1) {
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
								Total Score
							</Col>
							<Col span={24} className="mt-1">
								<span className="display-4">245</span><span className="mx-1">/</span>360
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
					columns={columnsDef} />
			</Panel>;
		});

		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		return (
			<div className="container">
				{studentBatches.length === 0 ? emptyJsx : <></>}
				<Collapse bordered={false}>
					{panelsJsx}
				</Collapse>
			</div>
		);
	}
}

export default Score;
