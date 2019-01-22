import React, { Component } from 'react';

import Navbar from './Navbar';

import {
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber
} from 'antd';
const { TextArea } = Input;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 5 },
		md: { span: 5 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
		md: { span: 16 }
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

class AddDiscount extends Component {
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
					</Form>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'add-discount' })(AddDiscount);
