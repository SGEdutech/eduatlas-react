import React, { Component } from 'react';

import RequestCard from './Requests/RequestCard';

import {
	Col,
	Empty,
	Icon,
	Input,
	Pagination,
	Row
} from 'antd';

const colLayout = {
	xs: 24,
	sm: 12,
	md: 12,
	xl: 8,
	xxl: 6
};

const pageSize = 12;

class Requests extends Component {
	state = {
		search: '',
		currentPage: 1,
		itemsPerPage: pageSize
	};

	handlePaginationChange = (currentPage, itemsPerPage) => this.setState({ currentPage, itemsPerPage });

	handleSearchInpChange = e => this.setState({ search: e.currentTarget.value, currentPage: 1 });

	render() {
		const { requests, addStudent, deleteRequest, batches, courses, students } = this.props;
		const { currentPage, itemsPerPage } = this.state;

		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		const requestsToRender = requests.filter(({ name, email }) => {
			const { search } = this.state;
			const searchRegex = new RegExp(search, 'i');
			return searchRegex.test(name) || searchRegex.test(email);
		});

		const requestsToRenderOnThisPage = requestsToRender.slice(itemsPerPage * (currentPage - 1), currentPage * itemsPerPage);

		const requestCardsJsx = (
			requestsToRenderOnThisPage.map(request => <Col {...colLayout} key={request._id}><RequestCard requestInfo={request} deleteRequest={deleteRequest} addStudent={addStudent} batches={batches} courses={courses} students={students} /></Col>)
		);
		return (
			<>
				<div className="container">
					<Row className="mb-3">
						<Input allowClear addonAfter={<Icon type="search" />} onChange={this.handleSearchInpChange} placeholder="Search Students" />
					</Row>
					<Row gutter={16}>
						{requestsToRender.length === 0 ? emptyJsx : requestCardsJsx}
					</Row>
					<Pagination current={currentPage} hideOnSinglePage={true} onChange={this.handlePaginationChange} pageSize={pageSize} total={requestsToRender.length} />
				</div>
			</>
		);
	}
}

export default Requests;
