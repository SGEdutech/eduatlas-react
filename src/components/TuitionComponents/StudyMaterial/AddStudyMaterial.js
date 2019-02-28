import React, { Component } from 'react';

import StudentSelector from '../Communicator/NewAnnouncement/StudentSelector';

import {
	Button,
	Col,
	Form,
	Icon,
	Input,
	Row,
	Select,
	Upload
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const colLayout = {
	xs: 24,
	md: 12
};

const dummyRequest = ({ file, onSuccess }) => {
	setTimeout(() => {
		onSuccess('ok');
	}, 0);
};

class AddStudyMaterial extends Component {
	state = {
		selectedFile: null,
		selectedFileList: []
	};

	filterOptions = (input, option) => {
		if (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) return true;
	}

	handleBatchChange = selectedBatches => {
		const { batches, form: { setFieldsValue }, students } = this.props;
		let studentsIdsOfSelectedBatches = [];
		selectedBatches.forEach(selectedBatchId => {
			const studentOfThisBatch = batches.find(batch => batch._id === selectedBatchId).students;
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
		const { form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(values);
		});
	}

	onChange = info => {
		const nextState = {};
		switch (info.file.status) {
			case 'uploading':
				nextState.selectedFileList = [info.file];
				break;
			case 'done':
				nextState.selectedFile = info.file;
				nextState.selectedFileList = [info.file];
				break;

			default:
				// error or removed
				nextState.selectedFile = null;
				nextState.selectedFileList = [];
		}
		console.log(nextState.selectedFile)
		this.setState(() => nextState);
	}

	render() {
		const { batches, students, form: { getFieldDecorator } } = this.props;

		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit} className="pt-3">
					<Row gutter={16}>
						<StudentSelector
							colLayout={colLayout}
							filterOptions={this.filterOptions}
							students={students}
							handleBatchChange={this.handleBatchChange}
							batches={batches}
							handleSelectAll={this.handleSelectAll}
							getFieldDecorator={getFieldDecorator} />
						<Col {...colLayout}>
							<Form.Item
								label="Title"
								hasFeedback={true}>
								{getFieldDecorator('title', {
									rules: [{ required: 'true', message: 'Must Provide Title' }]
								})(
									<Input placeholder="Title" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								label="Type Of Resource"
								hasFeedback={true}>
								{getFieldDecorator('type', {
									defaultValue: 'reference material',
									rules: [{ required: 'true', message: 'Must Choose Type' }]
								})(
									<Select>
										<Option className="text-uppercase" value="reference material">Reference Material</Option>
										<Option className="text-uppercase" value="homework">Homework</Option>
										<Option className="text-uppercase" value="test">Assignment/Test</Option>
										<Option className="text-uppercase" value="video">Video</Option>
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								label="Description"
								hasFeedback={true}>
								{getFieldDecorator('description')(
									<TextArea autosize={{ minRows: 4 }} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item label="File">
								<div className="dropbox">
									{getFieldDecorator('file', {
										rules: [{ required: 'true', message: 'Must Choose File' }]
									})(
										<Upload.Dragger
											fileList={this.state.selectedFileList}
											customRequest={dummyRequest}
											onChange={this.onChange}>
											<p className="ant-upload-drag-icon">
												<Icon type="inbox" />
											</p>
											<p className="ant-upload-text">Click or drag file to this area to upload</p>
										</Upload.Dragger>
									)}
								</div>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Upload And Share
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

export default Form.create({ name: 'new-study-material' })(AddStudyMaterial);
