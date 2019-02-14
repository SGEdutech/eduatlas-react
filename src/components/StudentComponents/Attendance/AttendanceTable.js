import React from 'react';
import moment from 'moment';

import {
	Tag,
	Table
} from 'antd';

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

function AttendanceTable(props) {
	const { schedulesOfThisBatch, studentId } = props;

	schedulesOfThisBatch.sort((a, b) => {
		const daysDiff = a.date.startOf('day').diff(b.date.startOf('day'), 'days');
		if (daysDiff !== 0) return daysDiff;
		return a.fromTime > b.fromTime;
	});
	schedulesOfThisBatch.forEach(schedule => {
		// Injecting status
		if (moment().startOf('day').diff(schedule.date.startOf('day'), 'days') < 0) {
			schedule.status = 'scheduled';
		} else if (schedule.studentsAbsent.find(studentAbsent => studentAbsent === studentId)) {
			schedule.status = 'absent';
		} else {
			schedule.status = 'present';
		}
		schedule.date = schedule.date.format('DD/MM/YY');
	});

	return (
		<Table
			rowKey="_id"
			className="mb-3"
			bordered={true}
			pagination={false}
			dataSource={schedulesOfThisBatch}
			columns={columns} />
	);
}

export default AttendanceTable;
