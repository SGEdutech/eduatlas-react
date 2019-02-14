import React, { Component } from 'react';

import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Switch
} from 'antd';
const { Option } = Select;

class StudentSelector extends Component {
	render() {
		const { colLayout, filterOptions, students, handleBatchChange, batches, handleSelectAll, getFieldDecorator } = this.props;
		return (
		<>
			<Col {...colLayout}>
				<Form.Item
					label="Students"
					hasFeedback={true}>
					{getFieldDecorator('receivers', {
						rules: [{
							required: true, message: 'Please select student(s)!'
						}]
					})(
						<Select showSearch
							size="large"
							mode="multiple"
							placeholder="Select Students"
							filterOption={filterOptions}
							className="w-100">
							{students.map(student => <Option key={student.email} value={student.email}>{student.name}</Option>)}
						</Select>
					)}
				</Form.Item>
			</Col>
			<Col {...colLayout}>
				<Form.Item
					label="Select Batches"
					hasFeedback={true}>
					<Select showSearch
						onChange={handleBatchChange}
						size="large"
						mode="multiple"
						placeholder="Select Batches"
						filterOption={filterOptions}
						className="w-100">
						{batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
					</Select>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item>
					<Switch checkedChildren="All Selected" unCheckedChildren="Select All" onChange={handleSelectAll} />
				</Form.Item>
			</Col>
		</>
		);
	}
}

export default StudentSelector;

