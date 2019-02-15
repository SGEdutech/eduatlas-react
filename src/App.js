import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

// tuition components
import AddOrEditBatch from './components/TuitionComponents/Configure/AddOrEditBatch';
import AddOrEditCourse from './components/TuitionComponents/Configure/AddOrEditCourse';
import AddOrEditDiscount from './components/TuitionComponents/Configure/AddOrEditDiscount';
import AddStudent from './components/TuitionComponents/Students/AddStudent';
import AttendanceDetails from './components/TuitionComponents/Attendance/AttendanceDetails';
import EditProfile from './components/EditProfile';
import EditSchedule from './components/TuitionComponents/Schedule/EditSchedule';
import TuitionManager from './components/TuitionComponents/TuitionManager';
import ViewOrEditStudent from './components/TuitionComponents/Students/ViewOrEditStudent';

// shared components
import Loading from './components/Loading';
import Login from './components/Login';
import Signup from './components/Signup';
import TabsTest from './components/TabsTest';

// student components
import StudentManager from './components/StudentComponents/StudentManager';

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
					<Route exact path="/tabs" component={TabsTest}></Route>
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
