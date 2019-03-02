import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';

import React, { Component } from 'react';

class PerformanceEvalReport extends Component {
	render() {
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
		return (
			<div className="container">
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
			</div>
		);
	}
}

export default PerformanceEvalReport;
