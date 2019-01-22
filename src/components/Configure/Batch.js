import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BatchCard from './Batch/BatchCard';

import {
	Card,
	Col,
	Icon,
	Row,
	Skeleton
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

class Batch extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Row gutter={16}>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-2">
								<BatchCard code="Some Batch"
									discription="Best freaking batch ever"
									courseCode="Some Course"
									numberOfStudents="69" />
							</div>
						</Col>
					</Row>
				</div>
				<Link to="/add-batch">
					<Icon type="plus-circle" theme="filled" style={plusIconStyle} />
				</Link>
			</>
		);
	}
}

export default Batch;
