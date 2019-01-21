import React, { Component } from 'react'

import {
	Avatar,
	Button,
	Card,
	Drawer,
	Icon,
	List,
	Row,
	Col
} from 'antd';
const { Meta } = Card;

const headerStyle = {
	height: '40px',
	zIndex: 101
};

const cursorStyle = {
	cursor: 'pointer'
};

const DrawerHeader = <Meta
	avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
	title="IMS Pitampura"
	description="Role: Admin"
/>

const NavListItem = props => (
	<Row type="flex" align="middle" className="my-3" style={cursorStyle}>
		<Icon type={props.iconType} className="mr-3" />
		<span>{props.content}</span>
	</Row>
);

class Navbar extends Component {

	state = { visible: false };

	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		const { renderBackBtn = false } = this.props;
		return (
			<>
				<nav className="navbar fixed-top bg-dark mb-0" style={headerStyle}>
					<div className="container text-center">
						{
							renderBackBtn ? (
								<Icon style={cursorStyle} type="arrow-left" />
							) : (
									<Icon style={cursorStyle} type="menu-fold" onClick={this.showDrawer} />
								)
						}
						<a>IMS PITAMPURA</a>
					</div>
				</nav>
				<Drawer
					title={DrawerHeader}
					placement="left"
					closable={true}
					onClose={this.onClose}
					visible={this.state.visible}>
					<List split={true} style={{ fontSize: 18 }}>
						<NavListItem iconType="edit" content="Edit Profile" />
						<NavListItem iconType="form" content="Receipt Config" />
						<NavListItem iconType="key" content="Change Password" />
						<NavListItem iconType="logout" content="Logout" />
					</List>
				</Drawer>
			</>
		)
	}
}

export default Navbar;
