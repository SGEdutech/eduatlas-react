import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

import IconsWithTooltip from '../SharedComponents/IconsWithTooltip';

import {
	Button,
	Divider,
	Form,
	Icon,
	Input,
	Modal,
	Row,
	Table
} from 'antd';
const confirm = Modal.confirm;

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

	showDeleteConfirm = id => {
		const { deleteStudent } = this.props;
		confirm({
			title: 'Are You Sure?',
			content: 'This action is permanent!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteStudent(id);
			}
		});
	};

	render() {
		const { studentsInfo, messageInfo } = this.props;

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
						<IconsWithTooltip iconType="eye" tooltipMessage="view" />
						<Divider type="vertical" />
						<Link to={'/edit-student/' + record._id}><IconsWithTooltip iconType="edit" tooltipMessage="edit" /></Link>
						<Divider type="vertical" />
						<IconsWithTooltip iconType="delete" tooltipMessage="delete" onClick={() => this.showDeleteConfirm(record._id)} />
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
						scroll={{ x: 700 }}
						rowKey="_id"
						columns={columns}
						dataSource={studentsInfo.students}
					/>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'accept-student' })(Active);
