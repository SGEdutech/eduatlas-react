import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseCard from './Course/CourseCard';

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

class Course extends Component {
	showDeleteConfirm = id => {
		const deleteCourse = this.props.deleteCourse;
		confirm({
			title: 'Are You Sure ?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteCourse(id);
			}
		});
	};

	render() {
		const { messageInfo, coursesInfo } = this.props;

		const coursesJsx = coursesInfo.courses.map(({ _id, code, description, batches, fees }) => (
			<Col {...colLayout} key={_id}>
				<div className="mb-3">
					<CourseCard
						id={_id}
						code={code}
						discription={description}
						numberOfBatches={batches}
						courseFee={fees}
						deleteCourse={this.showDeleteConfirm} />
				</div>
			</Col>
		));

		const emptyJsx = <Empty
			className="mt-4"
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
						{messageInfo.fetching ? skeletonCards : (coursesInfo.courses.length === 0 ? emptyJsx : coursesJsx)}
					</Row>
				</div>
				<Link to="/add-course">
					<Icon type="plus-circle" theme="filled" style={plusIconStyle} />
				</Link>
			</>
		);
	}
}

export default Course;
