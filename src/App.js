import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

import TuitionManager from './components/TuitionManager';
import AddOrEditCourse from './components/Configure/AddOrEditCourse';
import AddOrEditBatch from './components/Configure/AddOrEditBatch';
import AddOrEditDiscount from './components/Configure/AddOrEditDiscount';
import AddStudent from './components/Students/AddStudent';
import EditProfile from './components/EditProfile';
import { message } from 'antd';

import fetchAll from './redux/actions/fetchAllAction';
import { resetSandesh } from './redux/actions/mesageActions';

class App extends Component {
	componentDidMount() {
		if (this.props.messageInfo.fetched) return;
		this.props.fetchAll();
	}

	componentDidUpdate() {
		const { messageInfo } = this.props;
		if (messageInfo.kaamChaluHai) message.loading('Action in progress..', 0);
		if (messageInfo.kaamHoGaya) {
			message.destroy();
			message[messageInfo.lifafa.level](messageInfo.lifafa.sandesh);
			this.props.resetSandesh();
		}
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={TuitionManager}></Route>
					<Route exact path="/add-course" component={AddOrEditCourse}></Route>
					<Route exact path="/add-batch" component={AddOrEditBatch}></Route>
					<Route exact path="/add-discount" component={AddOrEditDiscount}></Route>
					<Route exact path="/edit-course/:courseId" render={() => <AddOrEditCourse edit={true} />}></Route>
					<Route exact path="/edit-batch/:batchId" render={() => <AddOrEditBatch edit={true} />}></Route>
					<Route exact path="/edit-discount/:discountId" render={() => <AddOrEditDiscount edit={true} />}></Route>
					<Route exact path="/edit-student/:studentId" render={() => <AddStudent edit={true} />}></Route>
					<Route exact path="/edit-profile/:userId" render={() => <EditProfile />}></Route>
				</Switch>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		messageInfo: state.messageInfo,
		student: state.student
	};
}

export default connect(mapStateToProps, { resetSandesh, fetchAll })(App);
