import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-relative-link';

import TestCard from './Test/TestCard';

import getTuitionIdFromUrl from '../../../scripts/getTuitionIdFromUrl';

import {
	Card,
	Col,
	Empty,
	Icon,
	Modal,
	Row,
	Skeleton
} from 'antd';

const confirm = Modal.confirm;

const plusIconStyle = {
	fontSize: '2.6rem',
	color: '#00bcd4',
	position: 'fixed',
	bottom: 70,
	right: 10
};

const colLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 6
};

class Test extends Component {
	showDeleteConfirm = testId => {
		const { deleteTest, match: { url } } = this.props;
		const tuitionId = getTuitionIdFromUrl(url);
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteTest(tuitionId, testId);
			}
		});
	};

	render() {
		const { messageInfo, tests } = this.props;

		const testsJsx = tests.map(({ _id, name, maxMarks, batchIds }) => (
			<Col {...colLayout} key={_id}>
				<div className="mb-3">
					<TestCard
						id={_id}
						name={name}
						maxMarks={maxMarks}
						batchIds={batchIds}
						deleteTest={this.showDeleteConfirm} />
				</div>
			</Col>
		));

		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		const skeletonCards = [];
		for (let i = 0; i < 5; i++) {
			skeletonCards.push(
				<Col {...colLayout} key={i}>
					<Card className="mb-3">
						<Skeleton loading={true} active>
						</Skeleton>
					</Card>
				</Col>
			);
		}

		return (
			<>
				<div className="container">
					<Row gutter={16}>
						{messageInfo.fetching ? skeletonCards : (tests.length === 0 ? emptyJsx : testsJsx)}
					</Row>
				</div>
				<Link to="./add-test">
					<Icon type="plus-circle" theme="filled" style={plusIconStyle} />
				</Link>
			</>
		);
	}
}

export default withRouter(Test);
