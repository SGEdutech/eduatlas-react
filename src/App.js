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
import ViewOrEditStudent from './components/Students/ViewOrEditStudent';
import EditSchedule from './components/Schedule/EditSchedule';
import AttendanceDetails from './components/Attendance/AttendanceDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Loading from './components/Loading';
import StudentManager from './components/StudentManager';
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
					<Route exact path="/" render={() => <Loading messageInfo={this.props.messageInfo} user={this.props.user} />}></Route>
					<Route exact path="/tuition/" component={TuitionManager}></Route>
					<Route exact path="/tuition/add-course" component={AddOrEditCourse}></Route>
					<Route exact path="/tuition/add-batch" component={AddOrEditBatch}></Route>
					<Route exact path="/tuition/add-discount" component={AddOrEditDiscount}></Route>
					<Route exact path="/tuition/edit-course/:courseId" render={() => <AddOrEditCourse edit={true} />}></Route>
					<Route exact path="/tuition/edit-batch/:batchId" render={() => <AddOrEditBatch edit={true} />}></Route>
					<Route exact path="/tuition/edit-discount/:discountId" render={() => <AddOrEditDiscount edit={true} />}></Route>
					<Route exact path="/tuition/student/:studentId/payment/:paymentId/add-installment" render={() => <AddStudent task="add-installment" />}></Route>
					<Route exact path="/tuition/student/:studentId/add-payment" render={() => <AddStudent task="add-payment" />}></Route>
					<Route exact path="/tuition/student/:studentId" render={() => <ViewOrEditStudent />}></Route>
					<Route exact path="/tuition/edit-schedule/:scheduleId" render={() => <EditSchedule />}></Route>
					<Route exact path="/tuition/attendance/:scheduleId" render={() => <AttendanceDetails />}></Route>
					<Route exact path="/edit-profile/:userId" render={() => <EditProfile />}></Route>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/signup" component={Signup}></Route>
					<Route exact path="/student" component={StudentManager}></Route>
				</Switch>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		messageInfo: state.messageInfo,
		student: state.student,
		user: state.user
	};
}

export default connect(mapStateToProps, { resetSandesh, fetchAll })(App);
