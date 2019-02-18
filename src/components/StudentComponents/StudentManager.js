import React from 'react';

import StudentNavbar from '../StudentNavbar';
import PrimaryStudentTabs from './PrimaryStudentTabs';

import {
	Row
} from 'antd';

export default function StudentManager() {
	return (
		<div className="below-nav-and-tab">
			<StudentNavbar />
			<PrimaryStudentTabs />
		</div>
	);
}

