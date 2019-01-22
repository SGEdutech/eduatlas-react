import React from 'react';

import { Icon, Tooltip } from 'antd';

function IconsWithTooltip(props) {
	const { iconType, tooltipMessage } = props;
	return (
		<Tooltip title={tooltipMessage}>
			<Icon type={iconType} />
		</Tooltip>
	);
}

export default IconsWithTooltip;
