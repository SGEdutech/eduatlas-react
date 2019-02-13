import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteStudent } from '../../redux/actions/studentActions';

import Active from './Students/Active';
import AddStudent from './Students/AddStudent';
import Requests from './Students/Requests';

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

class Students extends Component {
	render() {
		return (
			<Tabs size="large" tabPosition="bottom" tabBarStyle={innerTabs}>
				<TabPane tab="Requests" key="1">
					<Requests />
				</TabPane>
				<TabPane tab="Active Students" key="2">
					<Active messageInfo={this.props.messageInfo} studentsInfo={this.props.student} deleteStudent={this.props.deleteStudent} />
				</TabPane>
				<TabPane tab="Add New Student" key="3">
					<AddStudent />
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

export default connect(mapStateToProps, { deleteStudent })(Students);
