import React, { Component } from 'react';
import { connect } from 'react-redux';

import Course from './Configure/Course';
import Batch from './Configure/Batch';
import Discount from './Configure/Discount';

import fetchAll from '../redux/actions/fetchAllAction';
import { deleteCourse } from '../redux/actions/courseActions';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const innerTabs = {
	position: 'fixed',
	bottom: 0,
	width: '100%',
	background: '#fff',
	textAlign: 'center',
	zIndex: 100
};

class Configure extends Component {
	componentDidMount() {
		if (this.props.messageInfo.fetched) return;
		this.props.fetchAll();
	}

	deleteCourse = id => this.props.deleteCourse(id);

	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Courses" key="1">
					<Course coursesInfo={this.props.course} deleteCourse={this.deleteCourse} />
				</TabPane>
				<TabPane tab="Batches" key="2">
					<Batch batchesInfo={this.props.batch} />
				</TabPane>
				<TabPane tab="Discounts" key="3">
					<Discount />
				</TabPane>
			</Tabs>
		);
	}
}


function mapStateToProps(state) {
	return {
		batch: state.batch,
		course: state.course,
		messageInfo: state.messageInfo
	};
}

export default connect(mapStateToProps, { fetchAll, deleteCourse })(Configure);
