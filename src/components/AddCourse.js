import React, { Component } from 'react';

import Navbar from './Navbar';

import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
} from 'antd';
const { TextArea } = Input;

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

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};

const colLayout = {
	xs: 24,
	md: 12
};

class AddCourse extends Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: []
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Course Code">
								{getFieldDecorator('confirm', {
									rules: [{
										required: true, message: 'Please give some name!'
									}, {
										validator: this.compareToFirstPassword
									}]
								})(
									<Input placeholder="course code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Course Fee"
							>
								<InputNumber className="w-100" decimalSeparator="." precision={2} step={1000} min={0} max={10000000} defaultValue={0} />
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
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="GST %"
							>
								<InputNumber className="w-100" min={0} max={100} defaultValue={0} formatter={value => `${value}%`} />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item {...tailFormItemLayout}>
								<Checkbox>Inclusive Of Taxes</Checkbox>
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Total Fee"
							>
								<Input disabled placeholder="fee" />
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
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'add-course' })(AddCourse);
