import React from 'react';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import { Card } from 'antd';

const iconsArray = [
	<IconsWithTooltip tooltipMessage="Edit" iconType="edit" />,
	<IconsWithTooltip tooltipMessage="Delete" iconType="delete" />
];

function DiscountCard(props) {
	const { code, amount } = props;
	return (
		<Card title={code}
			actions={iconsArray}>
			<p><span className="font-weight-bold">Discount Amount:</span> {amount}</p>
		</Card>
	);
}

export default DiscountCard;
