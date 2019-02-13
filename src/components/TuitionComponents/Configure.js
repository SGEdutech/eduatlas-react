import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteCourse } from '../../redux/actions/courseActions';
import { deleteBatch } from '../../redux/actions/batchActions';
import { deleteDiscount } from '../../redux/actions/discountActions';

import Course from './Configure/Course';
import Batch from './Configure/Batch';
import Discount from './Configure/Discount';

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
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Courses" key="1">
					<Course messageInfo={this.props.messageInfo} coursesInfo={this.props.course} deleteCourse={this.props.deleteCourse} />
				</TabPane>
				<TabPane tab="Batches" key="2">
					<Batch messageInfo={this.props.messageInfo} batchesInfo={this.props.batch} deleteBatch={this.props.deleteBatch} />
				</TabPane>
				<TabPane tab="Discounts" key="3">
					<Discount messageInfo={this.props.messageInfo} discountsInfo={this.props.discount} deleteDiscount={this.props.deleteDiscount} />
				</TabPane>
			</Tabs>
		);
	}
}


function mapStateToProps(state) {
	return {
		batch: state.batch,
		course: state.course,
		messageInfo: state.messageInfo,
		student: state.student,
		discount: state.discount
	};
}

export default connect(mapStateToProps, { deleteCourse, deleteBatch, deleteDiscount })(Configure);
