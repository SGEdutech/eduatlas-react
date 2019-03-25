import React, { Component } from 'react';

import { parse } from 'papaparse';

import addStudentTemplate from '../../../../excel-templates/add-student.csv';

import {
	Button,
	Col,
	Icon,
	notification,
	Row,
	Upload
} from 'antd';

class ExcelStudentUpload extends Component {
	state = {
		selectedFile: null,
		selectedFileList: []
	};

	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

	showErrorMessage = message => {
		notification.error({
			description: message,
			duration: 0,
			message: 'Student can\'t be added',
		});
	}

	handleEmptyLastObj = studentsData => {
		const lastStudentData = studentsData[studentsData.length - 1];
		if (Boolean(lastStudentData['Roll Number']) === false && Boolean(lastStudentData['Name']) === false && Boolean(lastStudentData['E-Mail']) === false && Boolean(lastStudentData['Course Code']) === false) studentsData.pop();
	}

	calibrateCourseAndBatchCodeCasing = studentsData => {
		studentsData.forEach(studentData => {
			if (studentData['Batch Code(optional)']) studentData['Batch Code(optional)'] = studentData['Batch Code(optional)'].trim().toLowerCase();
			if (studentData['Course Code']) studentData['Course Code'] = studentData['Course Code'].trim().toLowerCase();
		});
	}

	validateRequiredFields = studentsData => {
		let isValid = true;
		studentsData.forEach((studentData, index) => {
			if (Boolean(studentData['Roll Number']) === false || Boolean(studentData['Name']) === false || Boolean(studentData['E-Mail']) === false || Boolean(studentData['Course Code']) === false) {
				this.showErrorMessage(`Student data at row ${index + 2} is missing some compulsary field(s)!`);
				isValid = false;
			}
		});
		return isValid;
	}

	validateUniqueFields = studentsData => {
		const { students } = this.props;
		let isValid = true;
		studentsData.forEach((studentData, index) => {
			students.forEach(student => {
				if (student.rollNumber === studentData['Roll Number'] || student.email === studentData['E-Mail']) this.showErrorMessage(`Email or roll number at row ${index + 2} already exists`);
				isValid = false;
			});
		});
		return isValid;
	}

	validateDuplicateEntries = studentsData => {
		let isValid = true;
		studentsData.forEach((studentData, index) => {
			const studentIndex = studentsData.findIndex(student => student['Roll Number'] === studentData['Roll Number'] || student['E-Mail'] === studentData['E-Mail']);
			if (studentIndex !== index) {
				this.showErrorMessage(`Roll number or email at row ${index + 2} has another entry with same value in in csv file`);
				isValid = false;
			}
		});
	}

	validateCourseCode = studentsData => {
		const { courses } = this.props;
		let isValid = true;
		studentsData.forEach((studentData, index) => {
			const doesCourseCodeExists = Boolean(courses.find(course => course.code === studentData['Course Code']));
			if (doesCourseCodeExists === false) {
				this.showErrorMessage(`Course with code ${studentData['Course Code']} at row ${index + 2} does not exists`);
				isValid = false;
			}
		});
		return isValid;
	}

	validateBatchCode = studentsData => {
		const { batches } = this.props;
		let isValid = true;
		studentsData.forEach((studentData, index) => {
			if (Boolean(studentData['Batch Code(optional)']) === false) return;
			const doesCourseCodeExists = Boolean(batches.find(batch => batch.code === studentData['Batch Code(optional)']));
			if (doesCourseCodeExists === false) {
				this.showErrorMessage(`Batch with code ${studentData['Batch Code(optional)']} at row ${index + 2} does not exists`);
				isValid = false;
			}
		});
		return isValid;
	}

	validateStudentsData = studentsData => {
		this.handleEmptyLastObj(studentsData);
		const isAnyEntryDuplicate = this.validateDuplicateEntries(studentsData);
		const areRequiredFieldsValid = this.validateRequiredFields(studentsData);
		const areUniqueFieldsValid = this.validateUniqueFields(studentsData);
		const areCourseCodeValid = this.validateCourseCode(studentsData);
		const areBatchCodeValid = this.validateBatchCode(studentsData);
		return isAnyEntryDuplicate || areRequiredFieldsValid || areUniqueFieldsValid || areCourseCodeValid || areBatchCodeValid;
	}

	validateAndAddStudents = studentDataJson => {
		this.calibrateCourseAndBatchCodeCasing(studentDataJson);
		const isValid = this.validateStudentsData(studentDataJson);
		if (isValid === false) return;
		console.log(studentDataJson);
	}

	parseCsv = () => {
		const { state: { selectedFile: { originFileObj } }, validateAndAddStudents } = this;
		parse(originFileObj, {
			header: true,
			complete: res => validateAndAddStudents(res.data)
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
		this.setState(() => nextState);
	};

	render() {
		const { selectedFileList } = this.state;
		return (
			<Col span={24}>
				<Row align="middle" className="my-1" justify="center" type="flex">
					<a href={addStudentTemplate} download>
						<Button block
							type="primary">
							Download Sample File
						</Button>
					</a>
				</Row>
				<Row align="middle" className="my-1" justify="center" type="flex">
					<Upload
						customRequest={this.dummyRequest}
						fileList={this.state.selectedFileList}
						onChange={this.onChange}>
						<Button block><Icon type="upload" /> Choose File</Button>
					</Upload>
				</Row>
				<Row align="middle" className="my-1" justify="center" type="flex">
					<Button
						disabled={selectedFileList.length === 0}
						onClick={this.parseCsv}
						type="primary">
						Save
					</Button>
				</Row>
			</Col>
		);
	}
}

export default ExcelStudentUpload;

