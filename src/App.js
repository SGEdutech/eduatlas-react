import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

import TuitionManager from './components/TuitionManager';
import AddOrEditCourse from './components/Configure/AddOrEditCourse';
import AddBatch from './components/Configure/AddBatch';
import AddDiscount from './components/Configure/AddDiscount';
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
					<Route exact path="/add-batch" component={AddBatch}></Route>
					<Route exact path="/add-discount" component={AddDiscount}></Route>
					<Route exact path="/edit-course/:courseId" component={() => <AddOrEditCourse edit={true} />}></Route>
				</Switch>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		messageInfo: state.messageInfo
	};
}

export default connect(mapStateToProps, { resetSandesh, fetchAll })(App);
