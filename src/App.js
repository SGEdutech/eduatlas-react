import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

import TuitionManager from './components/TuitionManager';
import AddCourse from './components/Configure/AddCourse';
import AddBatch from './components/Configure/AddBatch';
import AddDiscount from './components/Configure/AddDiscount';
import { message } from 'antd';

import { resetSandesh } from './redux/actions/mesageActions';

class App extends Component {
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
					<Route exact path="/add-course" component={AddCourse}></Route>
					<Route exact path="/add-batch" component={AddBatch}></Route>
					<Route exact path="/add-discount" component={AddDiscount}></Route>
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

export default connect(mapStateToProps, { resetSandesh })(App);
