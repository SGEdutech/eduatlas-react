import React, { Component } from 'react';

import {
	Avatar,
	Card,
	Icon,
	Skeleton,
} from 'antd';
const Meta = Card.Meta;

const plusIconStyle = {
	fontSize: '2.6rem',
	color: '#00bcd4',
	position: 'fixed',
	bottom: 70,
	right: 10
};

class Course extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Card className="mb-2"
						title="JEE Maths"
						actions={[<Icon type="edit" />, <Icon type="delete" />]}>
						<Skeleton loading={false} avatar active>
							<p>This is some desciprtion of the course given uptil some specific characters</p>
							<p><span className="font-weight-bold">Number Of Batches:</span> 5</p>
							<p><span className="font-weight-bold">Course Fee:</span> 40000</p>
						</Skeleton>
					</Card>
					<Card className="mb-2"
						title="JEE Maths"
						actions={[<Icon type="edit" />, <Icon type="delete" />]}>
						<Skeleton loading={false} avatar active>
							<p>This is some desciprtion of the course given uptil some specific characters</p>
							<p><span className="font-weight-bold">Number Of Batches:</span> 5</p>
							<p><span className="font-weight-bold">Course Fee:</span> 40000</p>
						</Skeleton>
					</Card>
				</div>
				<Icon type="plus-circle" theme="filled" style={plusIconStyle} />
			</>
		)
	}
}

export default Course;
