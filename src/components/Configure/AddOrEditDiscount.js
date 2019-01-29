import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addDiscount, editDiscount } from '../../redux/actions/discountActions';

import sanatizeFormObj from '../../scripts/sanatize-form-obj';

import Navbar from '../Navbar';

import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row
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
		saveAsPercentage: false,
		step: 500,
		min: 0,
		max: 9999999999,
		discountInfo: {}
	};

	conditionalFormatter = value => {
		if (this.state.saveAsPercentage) return `${value}%`
		return value;
	}

	handleSubmit = e => {
		e.preventDefault();
		const { form, addDiscount, editDiscount, history, edit, match } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			if (this.state.saveAsPercentage) {
				values.isPercent = true;
			}
			edit ? editDiscount(match.params.courseId, values) : addDiscount(values);
			history.goBack();
		});
	}

	handleSaveAsPercentageChange = e => {
		const isChecked = e.target.checked;
		// How the fuck is this working
		if (isChecked) this.setState({ saveAsPercentage: isChecked, step: 1, min: 0, max: 100 });
		else this.setState({ saveAsPercentage: isChecked, step: 500, min: 0, max: 10000000 });
	}

	static getDerivedStateFromProps(props, state) {
		if (props.edit === false) return state;
		const { discountId } = props.match.params;
		const discountInfo = props.discounts.find(discountObj => discountObj._id === discountId);
		// TODO: Implement loading for condition below
		if (discountInfo === undefined) return state;
		if (JSON.stringify(discountInfo) === JSON.stringify(state.discountInfo)) return state;
		return { ...state, discountInfo, saveAsPercentage: discountInfo.isPercent };
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { code, amount } = this.state.discountInfo;
		return (
			<>
				<Navbar renderBackBtn={true} />
				<div className="container below-nav">
					<Form onSubmit={this.handleSubmit} className="pt-3">
						<Col span={24}>
							<h3>{this.props.edit ? 'Edit Discount:' : 'Add Discount:'}</h3>
						</Col>
						<Col {...colLayout}>
							<Form.Item
								{...formItemLayout}
								label="Discount Code"
								hasFeedback={true}>
								{getFieldDecorator('code', {
									initialValue: code,
									rules: [{
										required: true, message: 'Please give some name!'
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
								hasFeedback={true}>
								{getFieldDecorator('amount', {
									initialValue: amount,
									rules: [{
										required: true, message: 'Discount must have amount!'
									}]
								})(
									<InputNumber className="w-100" step={this.state.step} min={this.state.min} max={this.state.max} formatter={this.conditionalFormatter} />
								)}
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item {...tailFormItemLayout}>
								<Checkbox checked={this.state.saveAsPercentage} onChange={this.handleSaveAsPercentageChange}>Save Discount as Percentage</Checkbox>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Row type="flex" justify="end">
								<Form.Item>
									<Button type="primary" htmlType="submit">
										{this.props.edit ? 'Edit Discount' : 'Add Discount'}
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

function mapStateToProps(state) {
	return {
		discounts: state.discount.discounts
	};
}

export default compose(Form.create({ name: 'add-discount' }), withRouter, connect(mapStateToProps, { addDiscount, editDiscount }))(AddDiscount);