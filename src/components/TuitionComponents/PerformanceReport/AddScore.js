// TODO: Sort this mess out
import React, { Component } from 'react';

import {
	Button,
	Col,
	Form,
	InputNumber,
	Row,
	Select,
	Table
} from 'antd';
const { Option } = Select;

const columnsDef = [{
	title: 'Name',
	dataIndex: 'name',
	key: 'name'
}, {
	title: 'Roll Number',
	dataIndex: 'rollNumber',
	key: 'rollNumber',
	width: '50'
}, {
	title: 'Score',
	dataIndex: 'score',
	key: 'score',
	width: '80',
	editable: 'true'
}];

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
		<tr {...props} />
	</EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class AddScore extends Component {
	constructor(props) {
		super(props);
		this.currentTestId = null;
	}

	state = {
		allTests: [],
		filteredTests: [],
		currentTestStudents: []
	}

	handleBatchSelectChange = currentBatchIds => {
		const { tests } = this.props;
		const filteredTests = tests.filter(test => Boolean(test.batchIds.find(batchId => Boolean(currentBatchIds.find(currentBatchId => currentBatchId === batchId)))));
		this.setState({ filteredTests });
	};

	handleSave = testRow => {
		this.setState(prevState => {
			const prevTestData = [...prevState.currentTestStudents];
			const newTestData = prevTestData.map(test => test._id === testRow._id ? testRow : test);
			return { currentTestStudents: newTestData };
		});
	}

	getCurrentTestStudents = () => {
		const { batches, students, tests } = this.props;
		const currentTestId = this.currentTestId;
		if (Boolean(currentTestId) === false) return;
		const testInfo = tests.find(test => test._id === currentTestId);
		let studentIdsOfThisTest = [];
		batches.forEach(batch => {
			if (testInfo.batchIds.find(batchId => batchId === batch._id)) studentIdsOfThisTest = [...studentIdsOfThisTest, ...batch.students];
		});
		studentIdsOfThisTest = [...new Set(studentIdsOfThisTest)];
		const currentTestStudents = studentIdsOfThisTest.map(studentId => students.find(student => student._id === studentId));
		// Injecting score
		currentTestStudents.forEach(student => {
			const studentReport = testInfo.reports.find(report => report.studentId === student._id);
			if (studentReport) student = student.score = studentReport.marksObtained;
		});
		return currentTestStudents;
	}

	handleTestSelectChange = currentTestId => {
		this.currentTestId = currentTestId;
		this.setState({ currentTestStudents: this.getCurrentTestStudents() });
	}

	handleSaveBtnClick = () => {
		const { editTest } = this.props;
		const { currentTestStudents } = this.state;
		const reports = currentTestStudents.map(student => {
			return {
				studentId: student._id,
				marksObtained: student.score || 0
			};
		});
		editTest(this.currentTestId, { reports });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (JSON.stringify(nextProps.tests) !== JSON.stringify(prevState.allTests)) return false;
		return { allTests: nextProps.tests };
	}

	render() {
		const { batches, tests } = this.props;
		const { currentTestStudents } = this.state;
		let { filteredTests } = this.state;
		filteredTests = filteredTests.length === 0 ? tests : filteredTests;
		const components = {
			body: {
				row: EditableFormRow,
				cell: EditableCell
			}
		};

		const columns = columnsDef.map(col => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: this.handleSave
				})
			};
		});

		return (
			<div className="container">
				<Row className="mb-3" type="flex" align="middle" justify="center">
					<Col span={24} className="p-1">
						<Select
							allowClear
							className="w-100"
							mode="multiple"
							onChange={this.handleBatchSelectChange}
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
							{filteredTests.map(test => <Option key={test._id} value={test._id}>{test.name}</Option>)}
						</Select>
					</Col>
				</Row>
				<Row gutter={16}>
					<Table
						rowClassName="editable-row"
						components={components}
						rowKey="_id"
						className="mb-3"
						bordered={true}
						pagination={false}
						dataSource={currentTestStudents}
						columns={columns} />
				</Row>
				<Row type="flex" justify="end">
					<Form.Item>
						<Button onClick={this.handleSaveBtnClick} type="primary">
							Save Changes
						</Button>
					</Form.Item>
				</Row>
			</div>
		);
	}
}

class EditableCell extends Component {
	state = {
		editing: false
	}

	toggleEdit = () => {
		const editing = !this.state.editing;
		this.setState({ editing }, () => {
			if (editing) {
				this.input.focus();
			}
		});
	}

	save = () => {
		const { record, handleSave } = this.props;
		this.form.validateFields((error, values) => {
			if (error) {
				return;
			}
			this.toggleEdit();
			handleSave({ ...record, ...values });
		});
	}

	render() {
		const { editing } = this.state;
		const {
			editable,
			dataIndex,
			title,
			record,
			index,
			handleSave,
			...restProps
		} = this.props;
		return (
			<td ref={node => (this.cell = node)} {...restProps}>
				{editable ? (
					<EditableContext.Consumer>
						{form => {
							this.form = form;
							return (
								editing ? (
									<FormItem style={{ margin: 0 }}>
										{form.getFieldDecorator(dataIndex, {
											initialValue: record[dataIndex]
										})(
											<InputNumber
												className="w-100"
												onPressEnter={this.save}
												onBlur={this.save}
												ref={node => (this.input = node)}
											/>
										)}
									</FormItem>
								) : (
										<div
											className="editable-cell-value-wrap"
											style={{ paddingRight: 24 }}
											onClick={this.toggleEdit}
										>
											{restProps.children}
										</div>
									)
							);
						}}
					</EditableContext.Consumer>
				) : restProps.children}
			</td>
		);
	}
}

export default AddScore;

