import React from 'react';
import { withRouter } from 'react-router-dom';

import {
	Icon,
	Row
} from 'antd';

function Loading(props) {
	const { messageInfo: { fetched, kaamChaluHai }, history: { replace }, user: { userInfo } } = props;
	console.log(userInfo);
	function redirectToLogin() {
		replace('/login');
	}

	function redirectToTuitionManager() {
		replace('/tuition');
	}

	function redirectToStudentManager() {
		replace('/student');
	}

	const tuitionId = '5bbe191a64512a2f77b84c70';
	const loadingJsx = (
		<Row style={{ height: '100vh' }} type="flex" justify="center" align="middle">
			<Icon style={{ fontSize: 64 }} type="smile" theme="twoTone" twoToneColor="#00bcd4" spin />
		</Row>
	);

	if (fetched === false || kaamChaluHai) return loadingJsx;
	if (Object.keys(userInfo).length === 0) {
		redirectToLogin();
		return loadingJsx;
	}
	const claims = userInfo.claims || [];
	const thisTuition = claims.find(claim => claim.listingId === tuitionId);
	if (thisTuition) {
		redirectToTuitionManager();
		return loadingJsx;
	}
	redirectToStudentManager();
	return loadingJsx;
}

export default withRouter(Loading);
