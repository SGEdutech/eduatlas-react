import React from 'react';
import { Link } from 'react-router-dom';

import IconsWithTooltip from '../../SharedComponents/IconsWithTooltip';

import {
	Avatar,
	Card,
	Col,
	Row
} from 'antd';
const { Meta } = Card;

function StudentCard(props) {
	const { id, name, rollNumber, deleteStudent } = props;

	const iconsArray = [
		<Link to={'/student/' + id}><IconsWithTooltip tooltipMessage="View" iconType="eye" /></Link>,
		<Link to={'/student/edit/' + id}><IconsWithTooltip tooltipMessage="Edit" iconType="edit" /></Link>,
		<IconsWithTooltip tooltipMessage="Delete" iconType="delete" onClick={() => deleteStudent(id)} />
	];

	return (
		<>
			<Card
				actions={iconsArray}>
				<Meta
					avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
					title={name}
					description={'Roll Number: ' + rollNumber}
				/>
			</Card>
		</>
	);
}

export default StudentCard;
