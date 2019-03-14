/* global FCMPlugin */
import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Router from './Router';

// Tuition components
import AddOrEditBatch from './components/TuitionComponents/Configure/AddOrEditBatch';
import AddOrEditCourse from './components/TuitionComponents/Configure/AddOrEditCourse';
import AddOrEditDiscount from './components/TuitionComponents/Configure/AddOrEditDiscount';
import AddOrEditTest from './components/TuitionComponents/PerformanceReport/Test/AddOrEditTest';
import AddStudent from './components/TuitionComponents/Students/AddStudent';
import AttendanceDetails from './components/TuitionComponents/Attendance/AttendanceDetails';
import EditProfile from './components/EditProfile';
import EditSchedule from './components/TuitionComponents/Schedule/EditSchedule';
import TuitionManager from './components/TuitionComponents/TuitionManager';
import ViewOrEditStudent from './components/TuitionComponents/Students/ViewOrEditStudent';

// Shared components
import Loading from './components/Loading';
import Login from './components/Login';
import Signup from './components/Signup';
import ReceiptConfig from './components/ReceiptConfig';

// Student components
import StudentManager from './components/StudentComponents/StudentManager';
import SendRequest from './components/StudentComponents/SendRequest';

import { message } from 'antd';

import fetchAll from './redux/actions/fetchAllAction';
import { resetSandesh } from './redux/actions/mesageActions';
import { addRequest } from './redux/actions/requestActions';

// Scripts
import refreshRegistrationId from './scripts/refreshRegistrationId';

class App extends Component {
	componentDidMount() {
		if (this.props.messageInfo.fetched) return;
		const { fetchAll } = this.props;
		fetchAll();
		setInterval(fetchAll, 2 * 60 * 1000);
		// Firebase service
		if (window.cordova) {
			window.cordova.plugins.autoStart.enable();
			// TODO: Fix memory leak
			FCMPlugin.onTokenRefresh(refreshRegistrationId);
		}
	}

	componentDidUpdate() {
		const { messageInfo } = this.props;
		if (messageInfo.kaamChaluHai) {
			message.loading('Action in progress..', 0);
		} else if (messageInfo.fetchFailed) {
			setTimeout(this.props.fetchAll, 5000);
		} else if (messageInfo.kaamHoGaya) {
			message.destroy();
			message[messageInfo.lifafa.level](messageInfo.lifafa.sandesh);
			this.props.resetSandesh();
		}
	}

	render() {
		const { url } = this.props.match;
		return (
			<Router>
				<Switch>
					<Route exact path={url + '/'} render={() => <Loading messageInfo={this.props.messageInfo} user={this.props.user} students={this.props.students} />}></Route>
					<Route exact path={url + '/send-request'} render={() => <SendRequest addRequest={this.props.addRequest} requests={this.props.requests} userInfo={this.props.user} />}></Route>
					<Route exact path={url + '/tuition'} component={TuitionManager}></Route>
					<Route exact path={url + '/tuition/add-course'} component={AddOrEditCourse}></Route>
					<Route exact path={url + '/tuition/add-batch'} component={AddOrEditBatch}></Route>
					<Route exact path={url + '/tuition/add-discount'} component={AddOrEditDiscount}></Route>
					<Route exact path={url + '/tuition/edit-course/:courseId'} render={() => <AddOrEditCourse edit={true} />}></Route>
					<Route exact path={url + '/tuition/edit-batch/:batchId'} render={() => <AddOrEditBatch edit={true} />}></Route>
					<Route exact path={url + '/tuition/edit-discount/:discountId'} render={() => <AddOrEditDiscount edit={true} />}></Route>
					<Route exact path={url + '/tuition/student/:studentId/payment/:paymentId/add-installment'} render={() => <AddStudent task="add-installment" />}></Route>
					<Route exact path={url + '/tuition/student/:studentId/add-payment'} render={() => <AddStudent task="add-payment" />}></Route>
					<Route exact path={url + '/tuition/student/:studentId'} render={() => <ViewOrEditStudent />}></Route>
					<Route exact path={url + '/tuition/edit-schedule/:scheduleId'} render={() => <EditSchedule />}></Route>
					<Route exact path={url + '/tuition/attendance/:scheduleId'} render={() => <AttendanceDetails />}></Route>
					<Route exact path={url + '/edit-profile/:userId'} render={() => <EditProfile />}></Route>
					<Route exact path={url + '/login'} component={Login}></Route>
					<Route exact path={url + '/signup'} component={Signup}></Route>
					<Route exact path={url + '/student'} component={StudentManager}></Route>
					<Route exact path={url + '/receipt-config'} component={ReceiptConfig}></Route>
					<Route exact path={url + '/tuition/add-test'} component={AddOrEditTest}></Route>
					<Route exact path={url + '/tuition/edit-test/:testId'} render={() => <AddOrEditTest edit={true} />}></Route>
				</Switch>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		messageInfo: state.messageInfo,
		requests: state.request.requests,
		students: state.student.students,
		user: state.user.userInfo
	};
}

export default compose(connect(mapStateToProps, { addRequest, resetSandesh, fetchAll }), withRouter)(App);
