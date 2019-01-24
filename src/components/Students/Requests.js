import React, { Component } from 'react';

import {
	Avatar,
	Card,
	Col,
	Form,
	Icon,
	Input,
	Row,
	Select
} from 'antd';
const { Meta } = Card;
const Option = Select.Option;

const colLayout = {
	xs: 24,
	sm: 12,
	md: 12,
	xl: 6,
	xxl: 4
};

class Requests extends Component {
	render() {
		const {
			getFieldDecorator
		} = this.props.form;

		return (
			<>
				<div className="container">
					<Row gutter={16}>
						<Col {...colLayout}>
							<Card
								className="mb-3"
								actions={[<Icon type="check" />, <Icon type="close" />]}
								title={
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Raj Kumar Sahni"
									/>
								}
							>
								<Form>
									<Form.Item>
										<Input disabled addonAfter={<Icon type="mail" />} defaultValue="thisisalongmailaddress@gmail.com" />
									</Form.Item>
									<Form.Item>
										<Input disabled addonAfter="EA ID" defaultValue="EA-AAA00001" />
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input roll number!' }]
										})(
											<Input addonAfter="Roll No." />
										)}
									</Form.Item>
									<Form.Item>
										<Select placeholder="Select a batch">
											<Option value="jack">JEE Maths</Option>
											<Option value="lucy">JEE Physics</Option>
											<Option value="Yiminghe">JEE Chemistry</Option>
										</Select>
									</Form.Item>
								</Form>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card
								className="mb-3"
								actions={[<Icon type="check" />, <Icon type="close" />]}
								title={
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Raj Kumar Sahni"
									/>
								}
							>
								<Form>
									<Form.Item>
										<Input disabled addonAfter={<Icon type="mail" />} defaultValue="thisisalongmailaddress@gmail.com" />
									</Form.Item>
									<Form.Item>
										<Input disabled addonAfter="EA ID" defaultValue="EA-AAA00001" />
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input roll number!' }]
										})(
											<Input addonAfter="Roll No." />
										)}
									</Form.Item>
									<Form.Item>
										<Select placeholder="Select a batch">
											<Option value="jack">JEE Maths</Option>
											<Option value="lucy">JEE Physics</Option>
											<Option value="Yiminghe">JEE Chemistry</Option>
										</Select>
									</Form.Item>
								</Form>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card
								className="mb-3"
								actions={[<Icon type="check" />, <Icon type="close" />]}
								title={
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Raj Kumar Sahni"
									/>
								}
							>
								<Form>
									<Form.Item>
										<Input disabled addonAfter={<Icon type="mail" />} defaultValue="thisisalongmailaddress@gmail.com" />
									</Form.Item>
									<Form.Item>
										<Input disabled addonAfter="EA ID" defaultValue="EA-AAA00001" />
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input roll number!' }]
										})(
											<Input addonAfter="Roll No." />
										)}
									</Form.Item>
									<Form.Item>
										<Select placeholder="Select a batch">
											<Option value="jack">JEE Maths</Option>
											<Option value="lucy">JEE Physics</Option>
											<Option value="Yiminghe">JEE Chemistry</Option>
										</Select>
									</Form.Item>
								</Form>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card
								className="mb-3"
								actions={[<Icon type="check" />, <Icon type="close" />]}
								title={
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Raj Kumar Sahni"
									/>
								}
							>
								<Form>
									<Form.Item>
										<Input disabled addonAfter={<Icon type="mail" />} defaultValue="thisisalongmailaddress@gmail.com" />
									</Form.Item>
									<Form.Item>
										<Input disabled addonAfter="EA ID" defaultValue="EA-AAA00001" />
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input roll number!' }]
										})(
											<Input addonAfter="Roll No." />
										)}
									</Form.Item>
									<Form.Item>
										<Select placeholder="Select a batch">
											<Option value="jack">JEE Maths</Option>
											<Option value="lucy">JEE Physics</Option>
											<Option value="Yiminghe">JEE Chemistry</Option>
										</Select>
									</Form.Item>
								</Form>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card
								className="mb-3"
								actions={[<Icon type="check" />, <Icon type="close" />]}
								title={
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Raj Kumar Sahni"
									/>
								}
							>
								<Form>
									<Form.Item>
										<Input disabled addonAfter={<Icon type="mail" />} defaultValue="thisisalongmailaddress@gmail.com" />
									</Form.Item>
									<Form.Item>
										<Input disabled addonAfter="EA ID" defaultValue="EA-AAA00001" />
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input roll number!' }]
										})(
											<Input addonAfter="Roll No." />
										)}
									</Form.Item>
									<Form.Item>
										<Select placeholder="Select a batch">
											<Option value="jack">JEE Maths</Option>
											<Option value="lucy">JEE Physics</Option>
											<Option value="Yiminghe">JEE Chemistry</Option>
										</Select>
									</Form.Item>
								</Form>
							</Card>
						</Col>
						<Col {...colLayout}>
							<Card
								className="mb-3"
								actions={[<Icon type="check" />, <Icon type="close" />]}
								title={
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Raj Kumar Sahni"
									/>
								}
							>
								<Form>
									<Form.Item>
										<Input disabled addonAfter={<Icon type="mail" />} defaultValue="thisisalongmailaddress@gmail.com" />
									</Form.Item>
									<Form.Item>
										<Input disabled addonAfter="EA ID" defaultValue="EA-AAA00001" />
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: 'Please input roll number!' }]
										})(
											<Input addonAfter="Roll No." />
										)}
									</Form.Item>
									<Form.Item>
										<Select placeholder="Select a batch">
											<Option value="jack">JEE Maths</Option>
											<Option value="lucy">JEE Physics</Option>
											<Option value="Yiminghe">JEE Chemistry</Option>
										</Select>
									</Form.Item>
								</Form>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Form.create({ name: 'accept-student' })(Requests);
