import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import NewAnnouncement from './Communicator/NewAnnouncement';
import Announcements from './Communicator/Announcements';

import { addNotification } from '../../redux/actions/notificationActions';

class Communicator extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		return (
			<>
				<AppBar position="fixed" color="default">
					<Tabs
						style={{ width: '100%', position: 'fixed', bottom: 0, background: 'white' }}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth">
						<Tab label="View" />
						<Tab label="Add" />
					</Tabs>
				</AppBar>
				{value === 0 && <Announcements messageInfo={this.props.messageInfo} announcements={[]} />}
				{value === 1 && <NewAnnouncement messageInfo={this.props.messageInfo} batches={this.props.batches} students={this.props.students} addNotification={this.props.addNotification} />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		messageInfo: state.messageInfo,
		students: state.student.students
	};
}

export default connect(mapStateToProps, { addNotification })(Communicator);
