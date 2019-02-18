import React from 'react';
import { Link } from 'react-router-dom';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

import { Card, Col, Row } from 'antd';
const { Meta } = Card;

function DiscountCard(props) {
	const { id, code, description, amount, isPercent, deleteDiscount } = props;

	const iconsArray = [
		<Link to={'/tuition/edit-discount/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteDiscount(id)} />
	];

	return (
		<Card
			actions={iconsArray}>
			<Meta
				title={<span className="text-uppercase">{code}</span>}
				description={
					<Row>
						<Col>
							<div className="one-line-ellipsis"><span className="font-weight-bold">Description:</span> {description}</div>
						</Col>
						<Col>
							<div><span className="font-weight-bold">Discount {isPercent ? 'Percentage(%)' : 'Amount'}:</span> {amount}</div>
						</Col>
					</Row>
				}
			/>
		</Card>
	);
}

export default DiscountCard;
