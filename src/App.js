/* global FCMPlugin */
import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Router from './Router';
import PullRefresh from 'react-pullrefresh';

// Tuition components
import AddOrEditBatch from './components/TuitionComponents/Configure/AddOrEditBatch';
import AddOrEditCourse from './components/TuitionComponents/Configure/AddOrEditCourse';
import AddOrEditDiscount from './components/TuitionComponents/Configure/AddOrEditDiscount';
import AddOrEditTest from './components/TuitionComponents/PerformanceReport/Test/AddOrEditTest';
import AddStudent from './components/TuitionComponents/Students/AddStudent';
import AttendanceDetails from './components/TuitionComponents/Attendance/AttendanceDetails';
import Communicator from './components/TuitionComponents/Communicator';
import Configure from './components/TuitionComponents/Configure';
import EditProfile from './components/EditProfile';
import EditSchedule from './components/TuitionComponents/Schedule/EditSchedule';
import PerformanceReport from './components/TuitionComponents/PerformanceReport';
import Requests from './components/TuitionComponents/Students/Requests';
import Students from './components/TuitionComponents/Students';
import TuitionManager from './components/TuitionComponents/TuitionManager';
import ViewAnnouncement from './components/TuitionComponents/Communicator/Announcements/ViewAnnouncement';
import ViewOrEditStudent from './components/TuitionComponents/Students/ViewOrEditStudent';

// Shared components
import Loading from './components/Loading';
import Login from './components/Login';
import Signup from './components/Signup';
import ReceiptConfig from './components/ReceiptConfig';

// Student components
import StudentManager from './components/StudentComponents/StudentManager';
import SendRequest from './components/StudentComponents/SendRequest';

// AntD Components
import { message, Modal } from 'antd';

// Actions
import fetchAll from './redux/actions/fetchAllAction';
import { addStudent } from './redux/actions/studentActions';
import { addRequest, deleteRequest } from './redux/actions/requestActions';
import { resetSandesh } from './redux/actions/mesageActions';

// Scripts
import refreshRegistrationId from './scripts/refreshRegistrationId';
import getTuitionIdFromUrl from './scripts/getTuitionIdFromUrl';

const confirm = Modal.confirm;

class App extends Component {
	componentDidMount() {
		if (this.props.messageInfo.fetched) return;
		const { fetchAll, match: { params: { tuitionId } } } = this.props;
		fetchAll(tuitionId);
		setInterval(() => fetchAll(tuitionId), 2 * 60 * 1000);
		// Firebase service
		if (window.cordova) {
			window.cordova.plugins.autoStart.enable();
			// TODO: Fix memory leak
			FCMPlugin.onTokenRefresh(refreshRegistrationId);
		}
	}

	componentDidUpdate() {
		const { fetchAll, match: { params: { tuitionId } }, messageInfo } = this.props;
		if (messageInfo.kaamChaluHai) {
			message.loading('Action in progress..', 0);
		} else if (messageInfo.fetchFailed) {
			setTimeout(() => fetchAll(tuitionId), 5000);
		} else if (messageInfo.kaamHoGaya) {
			message.destroy();
			message[messageInfo.lifafa.level](messageInfo.lifafa.sandesh);
			this.props.resetSandesh();
		}
	}

	handleRefresh = async () => {
		const { fetchAll, match: { params: { tuitionId } } } = this.props;
		await fetchAll(tuitionId);
	}

	showDeleteConfirm = studentId => {
		const { deleteRequest, match: { url } } = this.props;
		const tuitionId = getTuitionIdFromUrl(url);
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteRequest(tuitionId, studentId);
			}
		});
	};

	render() {
		const { url } = this.props.match;
		return (
			<PullRefresh
				onRefresh={this.handleRefresh}
				zIndex={102}
			>
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
						<Route exact path={url + '/tuition/view-announcement/:announcementId'} render={() => <ViewAnnouncement notifications={this.props.notifications} students={this.props.students} />}></Route>



						<Route exact path={url + '/configure'} component={Configure}></Route>
						<Route exact path={url + '/students'} component={Students}></Route>
						<Route exact path={url + '/communicator'} component={Communicator}></Route>
						<Route exact path={url + '/performance-report'} component={PerformanceReport}></Route>
						<Route exact path={url + '/app-downloads'} render={() => <Requests students={this.props.students} requests={this.props.requests} addStudent={this.props.addStudent} deleteRequest={this.showDeleteConfirm} batches={this.props.batches} courses={this.props.courses} />}></Route>
					</Switch>
				</Router>
			</PullRefresh>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		courses: state.course.courses,
		messageInfo: state.messageInfo,
		notifications: state.notification.notifications,
		requests: state.request.requests,
		students: state.student.students,
		user: state.user.userInfo
	};
}

export default compose(connect(mapStateToProps, { addRequest,addStudent, deleteRequest, resetSandesh, fetchAll }), withRouter)(App);
