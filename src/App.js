import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Router from './Router';

import TuitionManager from './components/TuitionManeger';
import AddCourse from './components/Configure/AddCourse';
import AddBatch from './components/Configure/AddBatch';
import AddDiscount from './components/Configure/AddDiscount';

class App extends Component {
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

export default App;
