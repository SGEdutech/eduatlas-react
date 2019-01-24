import React, { Component } from 'react';

import Highlighter from 'react-highlight-words';

import {
	Button,
	Divider,
	Form,
	Icon,
	Input,
	Row,
	Table
} from 'antd';

const STUDENTS = [{
	_id: '4',
	name: 'aman singh rajput',
	email: 'coolboy@gmail.com',
	rollNumber: 'm0001'
}, {
	_id: '1',
	name: 'rahul',
	email: 'mahi@gmail.com',
	rollNumber: 'm0002'
}, {
	_id: '2',
	name: 'ajay',
	email: 'dangi.pratap@gmail.com',
	rollNumber: 'm0003'
}, {
	_id: '3',
	name: 'prabhu',
	email: 'godisreal@gmail.com',
	rollNumber: 'm0004'
}];

class Active extends Component {
	state = { searchText: '' };

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys, selectedKeys, confirm, clearFilters
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
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: text => (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	})

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	}

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	}

	render() {
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				...this.getColumnSearchProps('name'),
				width: 150
			},
			{
				title: 'Roll-no.',
				dataIndex: 'rollNumber',
				key: 'rollNumber',
				...this.getColumnSearchProps('rollNumber'),
				width: 120
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				...this.getColumnSearchProps('email')
			},
			{
				align: 'center',
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<Row type="flex" justify="space-around">
						<Icon type="eye" />
						<Divider type="vertical" />
						<Icon type="edit" />
						<Divider type="vertical" />
						<Icon type="delete" />
					</Row>
				)
			}
		];

		return (
			<>
				<div className="container">
					<Table
						title={() => 'Active Students'}
						bordered
						pagination={false}
						scroll={{ x: 600 }}
						rowKey="_id"
						columns={columns}
						dataSource={STUDENTS}
					/>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'accept-student' })(Active);