import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import {
	Avatar,
	Card,
	Drawer,
	Icon,
	List,
	Row
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
/>;

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
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { renderBackBtn = false } = this.props;
		return (
			<>
				<nav className="navbar fixed-top bg-info mb-0" style={headerStyle}>
					<div className="container text-center">
						{
							renderBackBtn ? (
								<Icon style={cursorStyle} type="arrow-left" onClick={this.props.history.goBack} />
							) : (
									<Icon style={cursorStyle} type="menu-fold" onClick={this.showDrawer} />
								)
						}
						<Link to="/">IMS PITAMPURA</Link>
					</div>
				</nav>
				<Drawer
					title={DrawerHeader}
					placement="left"
					closable={true}
					onClose={this.onClose}
					visible={this.state.visible}>
					<List split={true} style={{ fontSize: 18 }}>
						<Link to={'/edit-profile/5bbe191a64512a2f77b84c70'}><NavListItem iconType="edit" content="Edit Profile" /></Link>
						<NavListItem iconType="form" content="Receipt Config" />
						<NavListItem iconType="key" content="Change Password" />
						<NavListItem iconType="logout" content="Logout" />
					</List>
				</Drawer>
			</>
		);
	}
}

export default withRouter(Navbar);
