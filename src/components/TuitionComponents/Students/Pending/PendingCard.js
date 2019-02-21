import React, { Component } from 'react';

import IconsWithTooltip from '../../../SharedComponents/IconsWithTooltip';

import sanatizeFormObj from '../../../../scripts/sanatize-form-obj';

import {
	Avatar,
	Card,
	Form,
	Icon,
	Input,
	Select
} from 'antd';
const { Meta } = Card;
const Option = Select.Option;


class PendingCard extends Component {
	handleSubmit = e => {
		e.preventDefault();
		const { form } = this.props;
		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				console.error(err);
				return;
			}
			sanatizeFormObj(values);
			console.log(values);
		});
	}

	render() {
		const { batches, form: { getFieldDecorator }, id, name, email } = this.props;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Card
					className="mb-3"
					actions={[
						<IconsWithTooltip onClick={this.handleSubmit} iconType="check" tooltipMessage="Add To Batch" />,
					]}
					title={
						<Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={name} />
					}>
					<Form.Item className="d-none">
						{getFieldDecorator('studentId', {
							initialValue: id
						})(
							<Input />
						)}
					</Form.Item>
					<Form.Item >
						<Input disabled defaultValue={email} />
					</Form.Item>
					<Form.Item >
						{getFieldDecorator('batchId', {
							rules: [{ required: true, message: 'Please select batch!' }]
						})(
							<Select placeholder="Select a batch">
								{batches.map(batch => <Option key={batch._id} value={batch._id}>{batch.code}</Option>)}
							</Select>
						)}
					</Form.Item>
				</Card>
			</Form>
		);
	}
}

export default Form.create({ name: 'accept-student' })(PendingCard);

