import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Swipeable } from 'react-swipeable';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ActiveSchedules from './Schedule/ActiveSchedules';
import ViewOrDeleteMaterials from './StudyMaterial/ViewOrDeleteMaterials';

import { changeTabs } from '../../redux/actions/navigationActions';
import { deleteResource } from '../../redux/actions/resourceActions';

import {
	Icon,
	Row
} from 'antd';

class PrimaryTuitionTabs extends Component {
	handleChange = (e, value) => this.props.changeTabs(value, 0);

	leftSwipe = () => {
		const { changeTabs, navigation: { primaryTabsValue } } = this.props;
		const minValue = 0;
		const maxValue = 2;
		let newPrimaryTabsValue = primaryTabsValue + 1;
		if (newPrimaryTabsValue < minValue) newPrimaryTabsValue = maxValue;
		if (newPrimaryTabsValue > maxValue) newPrimaryTabsValue = minValue;
		changeTabs(newPrimaryTabsValue, 0);
	}

	rightSwipe = () => {
		const { changeTabs, navigation: { primaryTabsValue } } = this.props;
		const minValue = 0;
		const maxValue = 2;
		let newPrimaryTabsValue = primaryTabsValue - 1;
		if (newPrimaryTabsValue < minValue) newPrimaryTabsValue = maxValue;
		if (newPrimaryTabsValue > maxValue) newPrimaryTabsValue = minValue;
		changeTabs(newPrimaryTabsValue, 0);
	}

	render() {
		const { navigation: { primaryTabsValue } } = this.props;
		const { deleteResource, messageInfo, resources } = this.props;
		return (
			<>
				<AppBar className="z101">
					<Tabs
						className="tabBar"
						style={{ background: '#f6f6f6' }}
						value={primaryTabsValue}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth">
						<Tab label={
							<>
								<Row><Icon type="schedule" /></Row>
								<Row><small>Schedule</small></Row>
							</>
						} />
						<Tab label={
							<>
								<Row><Icon type="carry-out" /></Row>
								<Row><small>Attendance</small></Row>
							</>
						} />
						<Tab label={
							<>
								<Row><Icon type="file-text" /></Row>
								<Row><small>Study Material</small></Row>
							</>
						} />
					</Tabs>
				</AppBar>
				<Swipeable delta={20} onSwipedLeft={this.leftSwipe} onSwipedRight={this.rightSwipe} style={{ minHeight: '80vh' }}>
					<div className="py-3">
						{primaryTabsValue === 0 && <ActiveSchedules />}
						{primaryTabsValue === 1 && <ActiveSchedules isAttendance={true} />}
						{primaryTabsValue === 2 && <ViewOrDeleteMaterials deleteResource={deleteResource} messageInfo={messageInfo} resources={resources} />}
					</div>
				</Swipeable>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		messageInfo: state.messageInfo,
		navigation: state.navigation,
		resources: state.resource.resources
	};
}

export default connect(mapStateToProps, { changeTabs, deleteResource })(PrimaryTuitionTabs);

