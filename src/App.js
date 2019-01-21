import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

import TuitionManager from './components/TuitionManeger';
import AddCourse from './components/AddCourse';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={TuitionManager}></Route>
					<Route exact path="/add-course" component={AddCourse}></Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
