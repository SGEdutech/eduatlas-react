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

import sanatizeForm from '../../../scripts/sanatize-form-obj';

const { Option } = Select;
const { TextArea } = Input;

const colLayout = {
	xs: 24,
	md: 12
};

class NewAnnouncement extends Component {
	filterOptions = (input, option) => {
		if (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) return true;
	}

	handleBatchChange = selectedBatches => {
		const { batches, form: { setFieldsValue }, students } = this.props;
		let studentsIdsOfSelectedBatches = [];
		selectedBatches.forEach(selectedBatch => {
			const studentOfThisBatch = batches.find(batch => batch._id === selectedBatch).students;
			studentsIdsOfSelectedBatches = [...new Set([...studentsIdsOfSelectedBatches, ...studentOfThisBatch])];
		});
		const studentEmailsOfSelectedBatch = studentsIdsOfSelectedBatches.map(studentId => students.find(student => student._id === studentId).email);
		setFieldsValue({ receivers: studentEmailsOfSelectedBatch });
	}

	handleStudentChange = selectedStudents => this.setState({ selectedStudents });

	handleSelectAll = isChecked => {
		const { setFieldsValue } = this.props.form;
		const { students } = this.props;
		const allStudents = students.map(student => student.email);
		isChecked ? setFieldsValue({ receivers: allStudents }) : setFieldsValue({ receivers: [] });
	}

	handleSubmit = e => {
		e.preventDefault();
		const { addNotification, form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			values.senderId = '5bbe191a64512a2f77b84c70';
			sanatizeForm(values);
			addNotification(values);
		});
	}

	render() {
		const { batches, students, form: { getFieldDecorator } } = this.props;

		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Row gutter={16}>
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
										filterOption={this.filterOptions}
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
									onChange={this.handleBatchChange}
									size="large"
									mode="multiple"
									placeholder="Select Batches"
									filterOption={this.filterOptions}
									className="w-100">
									{batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
								</Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item>
								<Switch checkedChildren="All Selected" unCheckedChildren="Select All" onChange={this.handleSelectAll} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								label="Announcement Text"
								hasFeedback={true}>
								{getFieldDecorator('message', {
									rules: [{
										required: true, message: 'Please provide text!'
									}]
								})(
									<TextArea autosize={{ minRows: 4 }} />
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Send Announcement
									</Button>
								</Form.Item>
							</Row>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create({ name: 'new-announcement' })(NewAnnouncement);
