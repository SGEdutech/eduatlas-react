import React, { Component } from 'react';

import PendingCard from './Pending/PendingCard';

import {
	Card,
	Col,
	Empty,
	Icon,
	Input,
	Pagination,
	Row,
	Skeleton
} from 'antd';

const colLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 6
};

class Pending extends Component {
	state = {
		search: '',
		currentPage: 1,
		itemsPerPage: 10
	};

	handlePaginationChange = (currentPage, itemsPerPage) => this.setState({ currentPage, itemsPerPage });

	handleSearchInpChange = e => this.setState({ search: e.target.value });

	render() {
		const { addStudentInBatch, batches, deleteStudent, messageInfo, students } = this.props;
		const { currentPage, itemsPerPage } = this.state;

		// filter out students with batches
		let studentsToRender = students.filter(student => {
			batches.forEach(batch => {
				if (batch.students.find(studentId => student._id === studentId)) return false;
			});
			return true;
		});

		studentsToRender = studentsToRender.filter(student => {
			const { rollNumber, name, email } = student;
			const searchRegex = new RegExp(this.state.search, 'i');
			return searchRegex.test(rollNumber) || searchRegex.test(name) || searchRegex.test(email);
		});

		studentsToRender = studentsToRender.slice(itemsPerPage * (currentPage - 1), currentPage * itemsPerPage);

		const studentsJsx = studentsToRender.map(({ _id, name, rollNumber, email }) => (
			<Col {...colLayout} key={_id}>
				<div className="mb-3">
					<PendingCard
						batches={batches}
						deleteStudent={deleteStudent}
						id={_id}
						name={name}
						rollNumber={rollNumber}
						email={email}
						addStudentInBatch={addStudentInBatch} />
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
						<Skeleton loading={true} active></Skeleton>
					</Card>
				</Col>
			);
		}

		return (
			<>
				<div className="container">
					<Row className="mb-3">
						<Input allowClear addonAfter={<Icon type="search" />} onChange={this.handleSearchInpChange} placeholder="Search Students" />
					</Row>
					<Row gutter={16}>
						{messageInfo.fetching ? skeletonCards : (studentsToRender.length === 0 ? emptyJsx : studentsJsx)}
					</Row>
					<Pagination onChange={this.handlePaginationChange} total={students.length} />
				</div>
			</>
		);
	}
}

export default Pending;
