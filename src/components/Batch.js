import React, { Component } from 'react';

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

class Batch extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Row gutter={16}>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="MM1"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the batch given uptil some specific characters</p>
									<p><span className="font-weight-bold">Course:</span> JEE Maths</p>
									<p><span className="font-weight-bold">Number Of Students:</span> 5</p>
								</Skeleton>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="MM1"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the batch given uptil some specific characters</p>
									<p><span className="font-weight-bold">Course:</span> JEE Maths</p>
									<p><span className="font-weight-bold">Number Of Students:</span> 5</p>
								</Skeleton>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="MM1"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the batch given uptil some specific characters</p>
									<p><span className="font-weight-bold">Course:</span> JEE Maths</p>
									<p><span className="font-weight-bold">Number Of Students:</span> 5</p>
								</Skeleton>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card className="mb-2"
								title="MM1"
								actions={[<Icon type="edit" />, <Icon type="delete" />]}>
								<Skeleton loading={false} avatar active>
									<p>This is some desciprtion of the batch given uptil some specific characters</p>
									<p><span className="font-weight-bold">Course:</span> JEE Maths</p>
									<p><span className="font-weight-bold">Number Of Students:</span> 5</p>
								</Skeleton>
							</Card>
						</Col>
					</Row>
				</div>
				<Icon type="plus-circle" theme="filled" style={plusIconStyle} />
			</>
		)
	}
}

export default Batch;
