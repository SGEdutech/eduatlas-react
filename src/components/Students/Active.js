import React, { Component } from 'react';

import StudentCard from './Active/StudentCard';

import {
	Card,
	Col,
	Empty,
	Form,
	Icon,
	Input,
	Modal,
	Row,
	Skeleton
} from 'antd';
const confirm = Modal.confirm;

const colLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 6
};

class Active extends Component {
	state = { search: '' };

	handleSearchInpChange = e => this.setState({ search: e.target.value });

	showDeleteConfirm = id => {
		const { deleteStudent } = this.props;
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteStudent(id);
			}
		});
	};

	render() {
		const { studentsInfo, messageInfo } = this.props;

		const studentsToRender = studentsInfo.students.filter(student => {
			const { rollNumber, name, email } = student;
			const searchRegex = new RegExp(this.state.search, 'i');
			return searchRegex.test(rollNumber) || searchRegex.test(name) || searchRegex.test(email)
		});

		const studentsJsx = studentsToRender.map(({ _id, name, rollNumber, email }) => (
			<Col {...colLayout} key={_id}>
				<div className="mb-3">
					<StudentCard
						id={_id}
						name={name}
						rollNumber={rollNumber}
						email={email}
						deleteStudent={this.showDeleteConfirm} />
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
					<Row className="mb-3">
						<Input allowClear addonAfter={<Icon type="search" />} onChange={this.handleSearchInpChange} placeholder="Search Students" />
					</Row>
					<Row gutter={16}>
						{messageInfo.fetching ? skeletonCards : (studentsInfo.students.length === 0 ? emptyJsx : studentsJsx)}
					</Row>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'accept-student' })(Active);
