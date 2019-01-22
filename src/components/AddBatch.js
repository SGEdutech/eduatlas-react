import React, { Component } from 'react'

import Highlighter from 'react-highlight-words';

import {
	Button,
	Checkbox,
	Col,
	Form,
	Icon,
	Input,
	InputNumber,
	Row,
	Select,
	Table,
} from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 7 },
		md: { span: 9 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 14 },
		md: { span: 12 }
	}
};

const studentTableLayout = {
	labelCol: {
		xs: { span: 24 },
	},
	wrapperCol: {
		xs: { span: 24 },
	},
};


const colLayout = {
	xs: 24,
	md: 12
}

const STUDENTS = [{
	_id: "4",
	name: 'aman singh rajput',
	email: 'coolboy@gmail.com',
	rollNumber: 'm0001',
}, {
	_id: "1",
	name: 'rahul',
	email: 'mahi@gmail.com',
	rollNumber: 'm0002',
}, {
	_id: "2",
	name: 'ajay',
	email: 'dangi.pratap@gmail.com',
	rollNumber: 'm0003',
}, {
	_id: "3",
	name: 'prabhu',
	email: 'godisreal@gmail.com',
	rollNumber: 'm0004',
}];


class AddBatch extends Component {
	state = {
		loading: false,
		searchText: '',
		selectedRowKeys: [],
		confirmDirty: false,
		autoCompleteResult: [],
	};

	enterLoading = () => {
		this.setState({ loading: true });
	}

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys, selectedKeys, confirm, clearFilters,
		}) => (
				<div style={{ padding: 8 }}>
					<Input
						ref={node => { this.searchInput = node; }}
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
						style={{ width: 188, marginBottom: 8, display: 'block' }}
					/>
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm)}
						icon="search"
						size="small"
						style={{ width: 90, marginRight: 8 }}
					>
						Search
			</Button>
					<Button
						onClick={() => this.handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
			</Button>
				</div>
			),
		filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) => (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		),
	})

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	}

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	}

	selectRow = record => {
		const selectedRowKeys = [...this.state.selectedRowKeys];
		if (selectedRowKeys.indexOf(record._id) >= 0) {
			selectedRowKeys.splice(selectedRowKeys.indexOf(record._id), 1);
		} else {
			selectedRowKeys.push(record._id);
		}
		this.setState({ selectedRowKeys });
	}

	onselectedRowKeysChange = selectedRowKeys => {
		this.setState({ selectedRowKeys });
	}

	render() {
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				...this.getColumnSearchProps('name'),
				width: 150,
			},
			{
				title: 'Roll-no.',
				dataIndex: 'rollNumber',
				key: 'rollNumber',
				...this.getColumnSearchProps('rollNumber'),
				width: 120,
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				...this.getColumnSearchProps('email'),
			}
		];
		const { getFieldDecorator } = this.props.form;

		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onselectedRowKeysChange,
		};

		return (
			<div className="container">
				<Form>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Course"
							hasFeedback
						>
							<Select defaultValue="1">
								<Option value="1">JEE Maths</Option>
								<Option value="2">JEE Physics</Option>
								<Option value="3">JEE Chemistry</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Batch Code">
							{getFieldDecorator('confirm', {
								rules: [{
									required: true, message: 'Please give some name!',
								}],
							})(
								<Input placeholder="batch code" />
							)}
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							{...formItemLayout}
							label="Description"
						>
							<TextArea rows={4} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							{...studentTableLayout}
						>
							<Table
								title={() => 'Add students to batch'}
								bordered
								pagination={false}
								scroll={{ y: 500, x: 500 }}
								rowKey="_id"
								rowSelection={rowSelection}
								columns={columns}
								dataSource={STUDENTS}
								onRow={record => ({
									onClick: () => {
										this.selectRow(record);
									}
								})}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Row type="flex" justify="end">
							<Form.Item>
								<Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
									Click me!
        						</Button>
							</Form.Item>
						</Row>
					</Col>
				</Form>
			</div >
		)
	}
}

export default Form.create({ name: 'add-batch' })(AddBatch);
