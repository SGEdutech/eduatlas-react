import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseCard from './Course/CourseCard';

import {
	Card,
	Col,
	Icon,
	Row
} from 'antd';

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
	xxl: 4
};

class Course extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Row gutter={16}>
						<Col {...colLayout}>
							<div className="mb-2">
								<CourseCard
									code="JEE 2018"
									discription="This is the best god damn course ever"
									numberOfBatches="6"
									courseFee="3000" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<CourseCard
									code="JEE 2018"
									discription="This is the best god damn course ever"
									numberOfBatches="6"
									courseFee="3000" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<CourseCard
									code="JEE 2018"
									discription="This is the best god damn course ever"
									numberOfBatches="6"
									courseFee="3000" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<CourseCard
									code="JEE 2018"
									discription="This is the best god damn course ever"
									numberOfBatches="6"
									courseFee="3000" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<CourseCard
									code="JEE 2018"
									discription="This is the best god damn course ever"
									numberOfBatches="6"
									courseFee="3000" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<CourseCard
									code="JEE 2018"
									discription="This is the best god damn course ever"
									numberOfBatches="6"
									courseFee="3000" />
							</div>
						</Col>
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
