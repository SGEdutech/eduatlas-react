import moment from 'moment';
import React, { Component } from 'react';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';

import {
	Col,
	Collapse,
	Empty,
	Row,
	Table
} from 'antd';

const { Panel } = Collapse;


class PerformanceEvalReport extends Component {
	render() {
		const { batches, schedules, studentInfo } = this.props;
		const studentBatches = batches.filter(batch => Boolean(batch.students.find(student => student === studentInfo._id)));

		const option = {
			title: {
				text: 'random',
				subtext: 'chart'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['line1', 'line2']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			dataZoom: [
				{
					id: 'dataZoomX',
					type: 'slider',
					xAxisIndex: [0],
					filterMode: 'filter'
				}
			],
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: 'line1',
				type: 'line',
				data: [120, 282, 91, 134, 190, 130, 110],
				markLine: {
					data: [
						{ type: 'average', name: 'average' }
					]
				}
			}, {
				name: 'line2',
				type: 'line',
				data: [220, 182, 191, 234, 290, 330, 310],
				markLine: {
					data: [
						{ type: 'average', name: 'average' }
					]
				}
			}]
		};

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
				<ReactEchartsCore
					echarts={echarts}
					option={option}
					notMerge={true}
					lazyUpdate={true}
				// theme={"theme_name"}
				// onChartReady={this.onChartReadyCallback}
				// onEvents={EventsDict}
				// opts={} 
				/>
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

export default PerformanceEvalReport;
