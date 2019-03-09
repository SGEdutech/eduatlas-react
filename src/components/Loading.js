import React from 'react';
import { withRouter } from 'react-router-dom';
import { tuitionId } from '../config.json';

import {
	Icon,
	Row
} from 'antd';

function Loading(props) {
	const { messageInfo: { fetched, kaamChaluHai }, history: { replace }, students, user } = props;
	function redirectToLogin() {
		replace('/login');
	}

	function redirectToTuitionManager() {
		replace('/tuition');
	}

	function redirectToStudentManager() {
		replace('/student');
	}

	function redirectToRequestSentPage() {
		replace('/send-request');
	}

	const loadingJsx = (
		<Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
			<Icon style={{ fontSize: 64 }} type="smile" theme="twoTone" twoToneColor="#00bcd4" spin />
		</Row>
	);

	if (fetched === false || kaamChaluHai) return loadingJsx;
	if (Object.keys(user).length === 0) {
		redirectToLogin();
		return loadingJsx;
	}
	const claims = user.claims || [];
	const thisTuition = claims.find(claim => claim.listingId === tuitionId);
	if (thisTuition) {
		redirectToTuitionManager();
		return loadingJsx;
	}
	const student = students.find(student => student.email === user.primaryEmail);
	if (student) {
		redirectToStudentManager();
		return loadingJsx;
	}
	redirectToRequestSentPage();
	return loadingJsx;
}

export default withRouter(Loading);
