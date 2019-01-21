import './core/css/material-kit.css';
import './App.css';

import React, { Component } from 'react';

import Navbar from './components/Navbar';
import PrimaryTabs from './components/PrimaryTabs';

class App extends Component {
	render() {
		return (
			<div className="stupid-class">
				<Navbar />
				<PrimaryTabs />
			</div>
		);
	}
}

export default App;
