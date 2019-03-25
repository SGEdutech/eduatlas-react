import React, { Component } from 'react';

import { parse } from 'papaparse';

import {
	Button,
	Col,
	Icon,
	notification,
	Row,
	Upload
} from 'antd';

import markAttendanceTemplate from '../../../../excel-templates/mark-attendance.csv';

class ExcelAttendanceUpload extends Component {
	state = {
		selectedFile: null,
		selectedFileList: []
	};

	dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0);

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

	parseCsv = () => {
		const { state: { selectedFile: { originFileObj } } } = this;
		parse(originFileObj, {
			header: true,
			complete: res => console.log(res.data)
		});
	}

	render() {
		const { selectedFileList } = this.state;
		return (
			<Col span={24}>
				<Row align="middle" className="my-1" justify="center" type="flex">
					<a href={markAttendanceTemplate} download>
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

export default ExcelAttendanceUpload;

