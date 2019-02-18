import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
	Avatar,
	Card,
	Drawer,
	Icon,
	List,
	Row
} from 'antd';

import { logOut } from '../redux/actions/userActions';

const { Meta } = Card;


const headerStyle = {
	height: '40px',
	zIndex: 101
};

const cursorStyle = {
	cursor: 'pointer',
};

const NavListItem = props => (
	<Row type="flex" align="middle" className="my-3" style={cursorStyle} onClick={props.onClick}>
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

	handleLogout = () => {
		const { history: { replace }, logOut } = this.props;
		logOut();
		replace('/');
	}

	render() {
		const { user, renderBackBtn = false, navText = undefined } = this.props;

		const DrawerHeader = <Meta
			avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
			title={<span className="text-capitalize">{user.userInfo.firstName}</span>}
			description="Role: Student"
		/>;

		return (
			<>
				<nav className="navbar fixed-top bg-info mb-0" style={headerStyle}>
					<div className="container" style={{ justifyContent: 'start' }}>
						{
							renderBackBtn ? (
								<>
									<Icon style={cursorStyle} type="arrow-left" onClick={this.props.history.goBack} />
									<span className="ml-auto mr-auto">{navText}</span>
								</>
							) : (
									<>
										<Icon style={cursorStyle} type="menu-fold" onClick={this.showDrawer} />
										<span className="ml-auto mr-auto"><Link to="/">IMS PITAMPURA</Link></span>
									</>
								)
						}
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
						<NavListItem iconType="key" content="Change Password" />
						<NavListItem iconType="logout" content="Logout" onClick={this.handleLogout} />
					</List>
				</Drawer>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default compose(connect(mapStateToProps, { logOut }), withRouter)(Navbar);


