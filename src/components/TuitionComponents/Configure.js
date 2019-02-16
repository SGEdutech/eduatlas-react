import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { deleteCourse } from '../../redux/actions/courseActions';
import { deleteBatch } from '../../redux/actions/batchActions';
import { deleteDiscount } from '../../redux/actions/discountActions';

import Course from './Configure/Course';
import Batch from './Configure/Batch';
import Discount from './Configure/Discount';

class Configure extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		return (
			<>
				<AppBar position="fixed" color="default">
					<Tabs
						style={{ width: '100%',	position: 'fixed', bottom: 0, background: 'white' }}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto">
						<Tab label="Courses" />
						<Tab label="Batches" />
						<Tab label="Discounts" />
					</Tabs>
				</AppBar>
				{value === 0 && <Course messageInfo={this.props.messageInfo} coursesInfo={this.props.course} deleteCourse={this.props.deleteCourse} />}
				{value === 1 && <Batch messageInfo={this.props.messageInfo} batchesInfo={this.props.batch} deleteBatch={this.props.deleteBatch} />}
				{value === 2 && <Discount messageInfo={this.props.messageInfo} discountsInfo={this.props.discount} deleteDiscount={this.props.deleteDiscount} />}
			</>
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
