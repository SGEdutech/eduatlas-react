import React, { Component } from 'react';
import { Link } from 'react-router-relative-link';

import AnnouncementCard from './Announcements/AnnouncementCard';
import Navbar from '../../Navbar';

import { getFloatingBtnCss } from '../../../scripts/sharedCss';

import {
	Card,
	Col,
	Empty,
	Icon,
	Row,
	Skeleton
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
			<Col {...cardColLayout} key={_id}>
				<AnnouncementCard
					id={_id}
					message={message}
					receivers={receivers}
					createdAt={createdAt} />
			</Col>
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
						<Icon type="plus-circle" theme="filled" style={getFloatingBtnCss()} />
					</Link>
				</div>
			</>
		);
	}
}

export default Announcements;

