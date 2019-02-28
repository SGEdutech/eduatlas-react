import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { deleteResource } from '../../redux/actions/resourceActions';

import AddStudyMaterial from './StudyMaterial/AddStudyMaterial';
import ViewOrDeleteMaterials from './StudyMaterial/ViewOrDeleteMaterials';

class StudyMaterial extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		const { batches, deleteResource, messageInfo, resources, students } = this.props;

		return (
			<>
				<AppBar color="default" className="z101">
					<Tabs
						className="tabBar"
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth">
						<Tab label="View" />
						<Tab label="Add" />
					</Tabs>
				</AppBar>
				{value === 0 && <ViewOrDeleteMaterials deleteResource={deleteResource} messageInfo={messageInfo} resources={resources} />}
				{value === 1 && <AddStudyMaterial batches={batches} students={students} />}
			</>
		);
	}
}


function mapStateToProps(state) {
	return {
		messageInfo: state.messageInfo,
		resources: state.resource.resources,
		batches: state.batch.batches,
		students: state.student.students
	};
}

export default connect(mapStateToProps, { deleteResource })(StudyMaterial);
