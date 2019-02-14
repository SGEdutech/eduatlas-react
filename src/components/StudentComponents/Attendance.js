import React, { Component } from 'react';

import {
	Col,
	Collapse,
	Divider,
	Row,
	Tag,
	Table
} from 'antd';
const { Panel } = Collapse;

const dataSource = [{
	key: '1',
	date: '23/11/2018',
	topic: 'maths 2 for noobs',
	status: (<Tag color={'green'}>Present</Tag>)
}, {
	key: '2',
	date: '23/11/2018',
	topic: 'maths 2 advanced',
	status: (<Tag color={'volcano'}>Absent</Tag>)
}, {
	key: '3',
	date: '23/11/2018',
	topic: 'maths 2 for noobs',
	status: (<Tag color={'green'}>Present</Tag>)
}, {
	key: '4',
	date: '23/11/2018',
	topic: 'maths 2 for noobs',
	status: (<Tag color={'green'}>Present</Tag>)
}, {
	key: '5',
	date: '23/11/2018',
	topic: 'maths 2 for noobs',
	status: (<Tag color={'green'}>Present</Tag>)
}];

const columns = [{
	title: 'Date',
	dataIndex: 'date',
	key: 'date',
	width: '100'
}, {
	title: 'Topic',
	dataIndex: 'topic',
	key: 'topic',
}, {
	title: 'Status',
	dataIndex: 'status',
	key: 'status',
	width: '50'
}];

export default class Attendance extends Component {
	render() {
		return (
			<div className="container">
				<Collapse bordered={false}>
					<Panel
						header={<Row>
							<Col span={12}>
								<Row>
									<Col span={24}>
										Batch
									</Col>
									<Col span={24} className="mt-1">
										<span className="display-4">M-1</span>
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<Row>
									<Col span={24}>
										% Attendance
									</Col>
									<Col span={24} className="mt-1">
										<span className="display-4">23</span><span className="mx-1">/</span>100
									</Col>
								</Row>
							</Col>
						</Row>}
						key="1">
						<Table
							className="mb-3"
							bordered={true}
							pagination={false}
							dataSource={dataSource}
							columns={columns} />
					</Panel>
					<Panel
						header={<Row>
							<Col span={12}>
								<Row>
									<Col span={24}>
										Batch
									</Col>
									<Col span={24} className="mt-1">
										<span className="display-4">M-1</span>
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<Row>
									<Col span={24}>
										% Attendance
									</Col>
									<Col span={24} className="mt-1">
										<span className="display-4">23</span><span className="mx-1">/</span>100
									</Col>
								</Row>
							</Col>
						</Row>}
						key="2">
						<Table
							className="mb-3"
							bordered={true}
							pagination={false}
							dataSource={dataSource}
							columns={columns} />
					</Panel>
					<Panel
						header={<Row>
							<Col span={12}>
								<Row>
									<Col span={24}>
										Batch
									</Col>
									<Col span={24} className="mt-1">
										<span className="display-4">M-1</span>
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<Row>
									<Col span={24}>
										% Attendance
									</Col>
									<Col span={24} className="mt-1">
										<span className="display-4">23</span><span className="mx-1">/</span>100
									</Col>
								</Row>
							</Col>
						</Row>}
						key="3">
						<Table
							className="mb-3"
							bordered={true}
							pagination={false}
							dataSource={dataSource}
							columns={columns} />
					</Panel>
				</Collapse>
			</div>
		);
	}
}
