import React, { Component } from 'react';

import RequestCard from './Requests/RequestCard';

import {
	Avatar,
	Card,
	Col,
	Empty,
	Form,
	Icon,
	Input,
	Row,
	Select
} from 'antd';
const { Meta } = Card;
const Option = Select.Option;

const colLayout = {
	xs: 24,
	sm: 12,
	md: 12,
	xl: 6,
	xxl: 4
};

class Requests extends Component {
	render() {
		const { requests, addStudent, deleteRequest, batches, courses } = this.props;

		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		const requestCardsJsx = (
			requests.map(request => <Col {...colLayout} key={request._id}><RequestCard requestInfo={request} deleteRequest={deleteRequest} addStudent={addStudent} batches={batches} courses={courses} /></Col>)
		);
		return (
			<>
				<div className="container">
					<Row gutter={16}>
						{requests.length === 0 ? emptyJsx : requestCardsJsx}
					</Row>
				</div>
			</>
		);
	}
}

export default Requests;
