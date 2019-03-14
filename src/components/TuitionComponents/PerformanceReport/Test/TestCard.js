import moment from 'moment';

import React from 'react';
import { Link } from 'react-router-relative-link';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

import { Card, Col, Row } from 'antd';
const { Meta } = Card;

function TestCard(props) {
	const { batchIds, date, deleteTest, id, maxMarks, name } = props;

	const iconsArray = [
		<Link to={'./edit-test/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteTest(id)} />
	];

	return (
		<Card
			actions={iconsArray}>
			<Meta
				title={<span className="text-uppercase">{name}</span>}
				description={
					<Row>
						<Col>
							<div className="one-line-ellipsis"><span className="font-weight-bold">Max Score:</span> {maxMarks}</div>
						</Col>
						<Col>
							<div><span className="font-weight-bold">Date:</span> {moment(date).format('MMM Do YY')}</div>
						</Col>
						<Col>
							<div><span className="font-weight-bold">Number Of Batches :</span> {batchIds.length}</div>
						</Col>
					</Row>
				}
			/>
		</Card>
	);
}

export default TestCard;
