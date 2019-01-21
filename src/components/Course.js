import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
	Card,
	Col,
	Icon,
	Row,
	Skeleton,
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
}

class Course extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Row gutter={16}>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="JEE Maths"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the course given uptil some specific characters</p>
									<p><span className="font-weight-bold">Number Of Batches:</span> 5</p>
									<p><span className="font-weight-bold">Course Fee:</span> 40000</p>
								</Skeleton>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="JEE Maths"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the course given uptil some specific characters</p>
									<p><span className="font-weight-bold">Number Of Batches:</span> 5</p>
									<p><span className="font-weight-bold">Course Fee:</span> 40000</p>
								</Skeleton>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="JEE Maths"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the course given uptil some specific characters</p>
									<p><span className="font-weight-bold">Number Of Batches:</span> 5</p>
									<p><span className="font-weight-bold">Course Fee:</span> 40000</p>
								</Skeleton>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="JEE Maths"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the course given uptil some specific characters</p>
									<p><span className="font-weight-bold">Number Of Batches:</span> 5</p>
									<p><span className="font-weight-bold">Course Fee:</span> 40000</p>
								</Skeleton>
							</Card>
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
