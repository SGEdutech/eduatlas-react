import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import StudentCard from './Active/StudentCard';

import filterStudents from '../../../scripts/filterStudents';
import getTuitionIdFromUrl from '../../../scripts/getTuitionIdFromUrl';

import {
	Card,
	Col,
	Empty,
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
		const { deleteStudent, match: { url } } = this.props;
		const tuitionId = getTuitionIdFromUrl(url);
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteStudent(tuitionId, id);
			}
		});
	};

	render() {
		const { batches, messageInfo, studentsInfo } = this.props;

		// filter out students without batches
		const studentsToShow = studentsInfo.students.filter(student => {
			let isInAnyBatch = false;
			batches.forEach(batch => {
				if (batch.students.find(studentId => student._id === studentId)) isInAnyBatch = true;
			});
			if (isInAnyBatch) return student;
			return false;
		});

		const studentsToRender = filterStudents(studentsToShow, this.state.search);

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
						{messageInfo.fetching ? skeletonCards : (studentsToShow.length === 0 ? emptyJsx : studentsJsx)}
					</Row>
				</div>
			</>
		);
	}
}

export default withRouter(Active);
