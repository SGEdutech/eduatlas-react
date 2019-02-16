import React, { Component } from 'react';
import { connect } from 'react-redux';

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
				<AppBar position="fixed" color="default">
					<Tabs
						style={{ width: '100%',	position: 'fixed', bottom: 0, background: 'white' }}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth">
						<Tab label="View" />
						<Tab label="Add" />
					</Tabs>
				</AppBar>
				{value === 1 && <ViewOrDeleteMaterials />}
				{value === 0 && <AddStudyMaterial />}
			</>
		);
	}
}


function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(StudyMaterial);
