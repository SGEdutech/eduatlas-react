import React from 'react';
import { Link } from 'react-router-dom';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import { Card, Col, Row } from 'antd';

function DiscountCard(props) {
	const { id, code, amount, isPercent, deleteDiscount } = props;

	const iconsArray = [
		<Link to={'/tuition/edit-discount/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteDiscount(id)} />
	];

	return (
		<Card title={<span className="text-uppercase">{code}</span>}
			actions={iconsArray}>
			<Row>
				<Col>
					<div><span className="font-weight-bold">Discount {isPercent ? 'Percentage(%)' : 'Amount'}:</span> {amount}</div>
				</Col>
			</Row>
		</Card>
	);
}

export default DiscountCard;
