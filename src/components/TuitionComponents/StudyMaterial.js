import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../core/css/tabBar.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddStudyMaterial from './StudyMaterial/AddStudyMaterial';
import ViewOrDeleteMaterials from './StudyMaterial/ViewOrDeleteMaterials';

class StudyMaterial extends Component {
	state = { value: 0 };

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
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
				{value === 0 && <ViewOrDeleteMaterials />}
				{value === 1 && <AddStudyMaterial />}
			</>
		);
	}
}


function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(StudyMaterial);
