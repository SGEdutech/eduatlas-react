import React, { Component } from 'react';

import FileCard from './ViewOrDeleteMaterials/FileCard';
import VideoCard from './ViewOrDeleteMaterials/VideoCard';

import {
	Card,
	Col,
	Empty,
	Row,
	Select,
	Skeleton
} from 'antd';

const colLayout = {
	xs: 24,
	md: 8
};

class ViewOrDeleteMaterials extends Component {
	state = {
		videoResources: [],
		vidDatas: [],
		filterResourceType: null
	};

	handleSelectChange = updatedFilterVal => {
		this.setState({ filterResourceType: updatedFilterVal });
	}

	render() {
		// console.log(this.state.vidDatas);
		const { deleteResource, messageInfo, resources } = this.props;
		const resourcesJsx = resources.map(({ _id, path, title, students, description, type, ytUrl }) => {
			if (type !== 'video') return <Col {...colLayout} key={_id}>
				<FileCard _id={_id} path={path} title={title} students={students} description={description} type={type} ytUrl={ytUrl}
					deleteResource={deleteResource} />
			</Col>;
		});
		const videoResources = resources.filter(resource => resource.type === 'video');
		const videoResourcesJsx = videoResources.map(({ _id, path, title, students, description, type, ytUrl }) => (
			<Col {...colLayout} key={_id}>
				<VideoCard _id={_id} path={path} title={title} students={students} description={description} type={type} ytUrl={ytUrl}
					deleteResource={deleteResource} />
			</Col>
		));

		const emptyJsx = <Empty className="mt-4"
			image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
			description={<span>Nothing is better than something...</span>}></Empty>;

		const skeletonCards = [];
		for (let i = 0; i < 5; i++) {
			skeletonCards.push(
				<Col {...colLayout} key={i}>
					<Card className="mb-3">
						<Skeleton loading={true} active>
						</Skeleton>
					</Card>
				</Col>
			);
		}

		return (
			<div className="container">
				<Row className="mb-3" type="flex" align="middle" justify="center">
					<Col span={24} className="p-1">
						<Select
							onChange={this.handleSelectChange}
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
					{messageInfo.fetching ? skeletonCards : (resources.length === 0 ? emptyJsx : resourcesJsx)}
				</Row>
				<Row gutter={16}>
					{messageInfo.fetching ? skeletonCards : videoResourcesJsx}
				</Row>
			</div>
		);
	}
}

export default ViewOrDeleteMaterials;

