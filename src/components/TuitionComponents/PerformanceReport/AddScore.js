// TODO: Sort this mess out
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import getTuitionIdFromUrl from '../../../scripts/getTuitionIdFromUrl';

import {
	Button,
	Col,
	Form,
	InputNumber,
	Row,
	Select,
	Table,
	Tag
} from 'antd';
const { Option } = Select;

const columnsDef = [{
	title: 'Name',
	dataIndex: 'name',
	key: 'name'
}, {
	title: 'Roll No. & Batch',
	dataIndex: 'rollNumberAndBatches',
	key: 'rollNumberAndBatches',
	width: '50',
	render: rollNumberAndBatches => {
		const batchCodesJsx = rollNumberAndBatches.batchCodes.map((batchCode, i) => <Tag key={i} className="mx-auto" color={'blue'}>{batchCode}</Tag>);
		return <Row className="text-center">
			<Col span={24}>{rollNumberAndBatches.rollNumber}</Col>
			<Col span={24}>{batchCodesJsx}</Col>
		</Row>;
	}
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
		currentTestStudents: []
	}

	handleClearBtnClick = () => {
		const { clearMarks, match: { url } } = this.props;
		if (Boolean(this.currentTestId) === false) return;
		const tuitionId = getTuitionIdFromUrl(url);
		clearMarks(tuitionId, this.currentTestId);
	}

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
		// Insert batchCode and studentID in studentIdsAndBatchesOfThisTest
		let studentIdsAndBatchesOfThisTest = [];
		batches.forEach(batch => {
			if (testInfo.batchIds.find(batchId => batchId === batch._id)) {
				batch.students.forEach(studentId => studentIdsAndBatchesOfThisTest.push({ studentId, batchCodes: [batch.code] }));
			}
		});
		// Grouping student in mutiple batches
		studentIdsAndBatchesOfThisTest = studentIdsAndBatchesOfThisTest.filter((studentDetails, index) => {
			const firstIndex = studentIdsAndBatchesOfThisTest.findIndex(studentObj => studentObj.studentId === studentDetails.studentId);
			if (firstIndex !== index) {
				studentIdsAndBatchesOfThisTest[firstIndex].batchCodes = [...studentIdsAndBatchesOfThisTest[firstIndex].batchCodes, ...studentIdsAndBatchesOfThisTest[index].batchCodes];
				return false;
			}
			return true;
		});
		// Extracting batchCodes from studentIdsAndBatchesOfThisTest and inserting in final student object
		const currentTestStudents = studentIdsAndBatchesOfThisTest.map(studentInfo => {
			const student = students.find(student => student._id === studentInfo.studentId);
			if (Boolean(student) === false) console.error('Something went wrong!!');
			student.batchCodes = studentInfo.batchCodes;
			return student;
		});
		// Injecting score ands merging rollNumber and batches
		currentTestStudents.forEach(student => {
			const studentReport = testInfo.reports.find(report => report.studentId === student._id);
			if (studentReport) student.score = studentReport.marksObtained;
			// TODO: Sort students by batch
			student.rollNumberAndBatches = { rollNumber: student.rollNumber, batchCodes: student.batchCodes };
			delete student.rollNumber;
			delete student.batchCodes;
		});
		return currentTestStudents;
	}

	handleTestSelectChange = currentTestId => {
		this.currentTestId = currentTestId;
		this.setState({ currentTestStudents: this.getCurrentTestStudents() });
	}

	handleSaveBtnClick = () => {
		if (Boolean(this.currentTestId) === false) return;
		const { editTest, match: { url } } = this.props;
		const { currentTestStudents } = this.state;
		const tuitionId = getTuitionIdFromUrl(url);
		const reports = currentTestStudents.map(student => {
			return {
				studentId: student._id,
				marksObtained: student.score || 0
			};
		});
		editTest(tuitionId, this.currentTestId, { reports });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (JSON.stringify(nextProps.tests) === JSON.stringify(prevState.allTests)) return false;
		return { allTests: nextProps.tests };
	}

	render() {
		const { allTests, currentTestStudents } = this.state;
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
							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							onChange={this.handleTestSelectChange}
							placeholder="Select Test"
							showSearch>
							{allTests.map(test => <Option key={test._id} value={test._id}>{test.name}</Option>)}
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
						<Button onClick={this.handleClearBtnClick} type="danger">
							Clear Score
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

export default withRouter(AddScore);

