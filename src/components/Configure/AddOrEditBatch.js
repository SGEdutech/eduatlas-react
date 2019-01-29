import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addBatch, editBatch } from '../../redux/actions/batchActions';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import Navbar from '../Navbar';
import Highlighter from 'react-highlight-words';
import {
	Button,
	Col,
	Form,
	Icon,
	Input,
	Row,
	Select,
	Table
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
		xs: { span: 24 }
	},
	wrapperCol: {
		xs: { span: 24 }
	},
};


const colLayout = {
	xs: 24,
	md: 12
};

const STUDENTS = [{
	_id: '4',
	name: 'aman singh rajput',
	email: 'coolboy@gmail.com',
	rollNumber: 'm0001'
}];


class AddBatch extends Component {
	state = {
		searchText: '',
		selectedRowKeys: [],
		autoCompleteResult: [],
		batchInfo: {}
	};

	enterLoading = () => {
		this.setState({ loading: true });
	}

	getColumnSearchProps = dataIndex => ({
		// don't touch this shit, its mineeeee -ANTD TABLE
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
						style={{ width: 188, marginBottom: 8, display: 'block' }} />
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm)}
						icon="search"
						size="small"
						style={{ width: 90, marginRight: 8 }}>
						Search
					</Button>
					<Button
						onClick={() => this.handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}>
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

	handleSubmit = e => {
		e.preventDefault();
		const { form, addBatch, editBatch, history, edit, match } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			values.students = this.state.selectedRowKeys;
			const { courseId } = values;
			delete values.courseId;
			edit ? editBatch(courseId, match.params.batchId, values) : addBatch(courseId, values);
			history.goBack();
		});
	}

	static getDerivedStateFromProps(props, state) {
		if (props.edit === false) return state;
		const { batchId } = props.match.params;
		const batchInfo = props.batches.find(courseObj => courseObj._id === batchId);
		// TODO: Implement loading for condition below
		if (batchInfo === undefined || JSON.stringify(batchInfo) === JSON.stringify(state.batchInfo)) return state;
		return { ...state, batchInfo, selectedRowKeys: [...batchInfo.students] };
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { courses, studentsOfTuition } = this.props;
		const { code, description, courseId, students } = this.state.batchInfo;
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
			}
		];
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onselectedRowKeysChange
		};

		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Col span={24}>
							<h3>{this.props.edit ? 'Edit Batch:' : 'Add Batch:'}</h3>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Parent Course"
								hasFeedback={true}>
								{getFieldDecorator('courseId', {
									initialValue: courseId,
									rules: [{
										required: true, message: 'Batch must have a parent Course!'
									}]
								})(
									<Select placeholder="select parent course" disabled={this.props.edit}>
										{courses.map(course => <Option key={course._id} value={course._id}>{course.code}</Option>)}
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Batch Code"
								hasFeedback={true}>
								{getFieldDecorator('code', {
									initialValue: code,
									rules: [{
										required: true, message: 'Batch must have some code!'
									}]
								})(
									<Input placeholder="batch code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Description"
								hasFeedback={true}>
								{getFieldDecorator('description', { initialValue: description })(<TextArea rows={4} />)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								{...studentTableLayout}>
								<Table
									title={() => 'Add students to batch'}
									bordered
									pagination={false}
									scroll={{ y: 500, x: 500 }}
									rowKey="_id"
									rowSelection={rowSelection}
									columns={columns}
									dataSource={studentsOfTuition}
									onRow={record => ({ onClick: () => this.selectRow(record) })} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										{this.props.edit ? 'Edit Batch' : 'Add Batch'}
									</Button>
								</Form.Item>
							</Row>
						</Col>
					</Form>
				</div >
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		batches: state.batch.batches,
		courses: state.course.courses,
		studentsOfTuition: state.student.students
	};
}

export default compose(Form.create({ name: 'add-batch' }), withRouter, connect(mapStateToProps, { addBatch, editBatch }))(AddBatch);
