import React from 'react';

import Navbar from '..//Navbar';
import PrimaryStudentTabs from './PrimaryStudentTabs';

import {
	Row
} from 'antd';

export default function StudentManager() {
	return (
		<div className="below-nav-and-tab">
			<Navbar />
			<PrimaryStudentTabs />
		</div>
	);
}

