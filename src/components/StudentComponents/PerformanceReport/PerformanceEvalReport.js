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
	Row
} from 'antd';

const { Panel } = Collapse;


class PerformanceEvalReport extends Component {
	render() {
		const { batches, tests, studentInfo } = this.props;
		const studentBatches = batches.filter(batch => Boolean(batch.students.find(student => student === studentInfo._id)));

		const option = {
			// title: {
			// 	text: 'random',
			// 	subtext: 'chart'
			// },
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['average', 'highest', 'lowest', 'your']
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
			series: [
				{
					name: 'average',
					type: 'line',
					data: [120, 282, 91, 134, 190, 130, 110]
				},
				{
					name: 'highest',
					type: 'line',
					data: [120, 282, 91, 134, 190, 130, 110]
				},
				{
					name: 'lowest',
					type: 'line',
					data: [120, 282, 91, 134, 190, 130, 110]
				},
				{
					name: 'your',
					type: 'line',
					data: [120, 282, 91, 134, 190, 130, 110]
				},
				/* {
					name: 'line2',
					type: 'line',
					data: [220, 182, 191, 234, 290, 330, 310],
					markLine: {
						data: [
							{ type: 'average', name: 'average' }
						]
					}
				} */
			]
		};

		const panelsJsx = studentBatches.map((batch, index) => {
			// TODO: remove schedules and bring in scores, remove moment
			let testsOfThisBatch = tests.filter(test => test.batchIds.find(batchId => batchId === batch._id));
			testsOfThisBatch = testsOfThisBatch.sort((a, b) => a.date.startOf('day').diff(b.date.startOf('day'), 'days'));

			let averageScores = [], highestScores = [], lowestScores = [], studentScores = [], testNames = [];
			testsOfThisBatch.forEach(test => {
				let isTestRelevant = false;
				let averageScore = 0, highestScore = 0;
				let lowestScore = test.maxMarks;
				let studentScore = null;
				const testName = test.name;

				test.reports.forEach(report => {
					const { marksObtained, studentId } = report;
					if (studentId === studentInfo._id) {
						isTestRelevant = true;
						studentScore = marksObtained;
					}
					averageScore += marksObtained;
					if (marksObtained > highestScore) highestScore = marksObtained;
					if (marksObtained < lowestScore) lowestScore = marksObtained;
				});
				if (isTestRelevant) {
					testNames.push(testName);
					averageScore /= test.reports.length;
					averageScores.push((averageScore / test.maxMarks) * 100);
					highestScores.push((highestScore / test.maxMarks) * 100);
					lowestScores.push((lowestScore / test.maxMarks) * 100);
					studentScores.push((studentScore / test.maxMarks) * 100);
				}
				test.parsedDate = test.date.format('DD/MM/YY');
			});

			// lets update graph options
			option.xAxis.data = testNames;
			option.series.forEach(series => {
				if (series.name === 'average') series.data = averageScores;
				if (series.name === 'highest') series.data = highestScores;
				if (series.name === 'lowest') series.data = lowestScores;
				if (series.name === 'your') series.data = studentScores;
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
								Total Tests
							</Col>
							<Col span={24} className="mt-1">
								<span className="display-4">{testsOfThisBatch.length}</span>
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
