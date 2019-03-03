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
	state = {
		batchFilter: null,
		testFilter: null,
		dataSource: [
			{ _id: 1, name: 'Mannvender Singh Dalal', rollNumber: 1, score: 0 },
			{ _id: 2, name: 'boy 2', rollNumber: 2, score: 0 },
			{ _id: 3, name: 'boy 3', rollNumber: 3, score: 0 },
			{ _id: 4, name: 'boy 4', rollNumber: 4, score: 0 },
			{ _id: 5, name: 'boy 5', rollNumber: 5, score: 0 }
		]
	}

	handleBatchSelectChange = updatedVal => {
		this.setState({ batchFilter: updatedVal });
	}

	handleTestSelectChange = updatedVal => {
		this.setState({ testFilter: updatedVal });
	}

	handleSave = row => {
		const newData = [...this.state.dataSource];
		const index = newData.findIndex(item => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row
		});
		this.setState({ dataSource: newData });
	}

	render() {
		const { batches } = this.props;
		const { dataSource } = this.state;
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
					<Table
						rowClassName={() => 'editable-row'}
						components={components}
						rowKey="_id"
						className="mb-3"
						bordered={true}
						pagination={false}
						dataSource={dataSource}
						columns={columns} />
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
											rules: [{
												required: true,
												message: `${title} is required.`,
											}],
											initialValue: record[dataIndex],
										})(
											<Input
												ref={node => (this.input = node)}
												onPressEnter={this.save}
												onBlur={this.save}
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

