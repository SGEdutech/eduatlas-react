import React, { Component } from 'react';

import {
	Col,
	Form,
	Input,
	Row,
	Select,
	Table
} from 'antd';
const { Option } = Select;

const colLayout = {
	xs: 24,
	md: 8
};


class AddScore extends Component {
	state = {
		batchFilter: null,
		testFilter: null,
	}

	handleBatchSelectChange = updatedVal => {
		this.setState({ batchFilter: updatedVal });
	}

	handleTestSelectChange = updatedVal => {
		this.setState({ testFilter: updatedVal });
	}

	render() {
		const { batches } = this.props;

		return (
			<div className="container">
				<Row className="mb-3" type="flex" align="middle" justify="center">
					<Col span={24} className="p-1">
						<Select
							onChange={this.handleBatchSelectChange}
							className="w-100"
							allowClear
							placeholder="Select Batch">
							{batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
						</Select>
					</Col>
					<Col span={24} className="p-1">
						<Select
							onChange={this.handleTestSelectChange}
							className="w-100"
							allowClear
							placeholder="Select Test">
							<Option value={1}>test 1</Option>
							<Option value={2}>test 2</Option>
							<Option value={3}>test 3</Option>
						</Select>
					</Col>
				</Row>
				<Row gutter={16}>
				</Row>
			</div>
		);
	}
}

export default AddScore;

