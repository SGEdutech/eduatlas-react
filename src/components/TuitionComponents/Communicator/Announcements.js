import React, { Component } from 'react';

import AnnouncementCard from './Announcements/AnnouncementCard';

import {
	Card,
	Col,
	Empty,
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
			<div className="container">
				<Row gutter={16}>
					{messageInfo.fetching ? skeletonCards : (announcements.length === 0 ? emptyJsx : announcementsJsx)}
				</Row>
			</div>
		);
	}
}

export default Announcements;

