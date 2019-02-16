import React, { Component } from 'react';

import FileCard from './ViewOrDeleteMaterials/FileCard';
import VideoCard from './ViewOrDeleteMaterials/VideoCard';

import {
	Button,
	Col,
	Form,
	Icon,
	Input,
	Row,
	Select,
	Switch,
	Upload
} from 'antd';
const { Option } = Select;

const colLayout = {
	xs: 24,
	md: 12
};

const cardColLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 6
};

class ViewOrDeleteMaterials extends Component {
	render() {
		return (
			<div className="container">
				<Row className="mb-3" type="flex" align="middle" justify="center">
					<Col span={24} className="p-1">
						<Select
							className="w-100"
							mode="multiple"
							allowClear
							placeholder="Filter Study Materials">
							<option class="text-uppercase" value="reference material">Reference Material</option>
							<option class="text-uppercase" value="homework">Homework</option>
							<option class="text-uppercase" value="test">Assignment/Test</option>
							<option class="text-uppercase" value="video">Video</option>
						</Select>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col {...cardColLayout}>
						<FileCard />
					</Col>
					<Col {...cardColLayout}>
						<FileCard />
					</Col>
					<Col {...cardColLayout}>
						<FileCard />
					</Col>
					<Col {...cardColLayout}>
						<FileCard />
					</Col>
					<Col {...cardColLayout}>
						<FileCard />
					</Col>
				</Row>
				<Row gutter={16}>
					<Col {...cardColLayout}>
						<VideoCard />
					</Col>
					<Col {...cardColLayout}>
						<VideoCard />
					</Col>
					<Col {...cardColLayout}>
						<VideoCard />
					</Col>
				</Row>
			</div>
		);
	}
}

export default ViewOrDeleteMaterials;

