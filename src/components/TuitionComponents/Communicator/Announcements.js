import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-relative-link';

import Navbar from '../../Navbar';

import { getFloatingBtnCss } from '../../../scripts/sharedCss';
import getRandomColor from '../../../scripts/randomColor';

import {
	Avatar,
	Card,
	Col,
	Comment,
	Empty,
	Icon,
	Row,
	Skeleton,
	Tooltip
} from 'antd';

const cardColLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 6
};

class Announcements extends Component {
	render() {
		const { announcements, messageInfo } = this.props;

		const announcementsJsx = announcements.reverse().map(({ _id, message, receivers, senderId, createdAt }) => (
			<Link to={'./view-announcement/' + _id} key={_id}>
				<Comment
					author={`Received By: ${receivers.length}`}
					avatar={
						<Avatar style={{ backgroundColor: getRandomColor() }}>{message.slice(0, 1).toUpperCase()}</Avatar>
					}
					content={
						<div className="one-line-ellipsis text-dark">{message}</div>
					}
					datetime={
						<Tooltip title={moment(createdAt).fromNow()}>
							<span>{moment(createdAt).fromNow()}</span>
						</Tooltip>
					}
				/>
			</Link>
		));


		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		const skeletonCards = [];
		for (let i = 0; i < 5; i++) {
			skeletonCards.push(
				<Col {...cardColLayout} key={i}>
					<Card className="mb-3">
						<Skeleton loading={true} active></Skeleton>
					</Card>
				</Col>
			);
		}

		return (
			<>
				<Navbar renderBackBtn={true} navText="Announcements" />
				<div className="container below-nav">
					<Row gutter={16}>
						{messageInfo.fetching ? skeletonCards : (announcements.length === 0 ? emptyJsx : announcementsJsx)}
					</Row>
					<Link to="./add-announcement">
						<Icon type="plus-circle" theme="filled" style={getFloatingBtnCss(false)} />
					</Link>
				</div>
			</>
		);
	}
}

export default Announcements;

