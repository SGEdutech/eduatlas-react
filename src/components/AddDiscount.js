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
								label="Discount Code">
								{getFieldDecorator('confirm', {
									rules: [{
										required: true, message: 'Please give some name!'
									}, {
										validator: this.compareToFirstPassword
									}]
								})(
									<Input placeholder="discount code" />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Amount"
							>
								<InputNumber className="w-100" step={100} min={0} max={10000000} defaultValue={0} />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Percentage"
							>
								<InputNumber disabled className="w-100" min={0} max={100} defaultValue={0} formatter={value => `${value}%`} />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item {...tailFormItemLayout}>
								<Checkbox>Save Discount as Percentage</Checkbox>
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

export default Form.create({ name: 'add-discount' })(AddDiscount);
