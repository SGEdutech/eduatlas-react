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

import { tuitionName } from '../config.json';
import fallbackDp from '../fallback-dp.svg';

const { Meta } = Card;


const headerStyle = {
	height: '40px',
	zIndex: 101
};

const cursorStyle = {
	cursor: 'pointer'
};

const NavListItem = props => (
	<Row type="flex" align="middle" className="my-3" style={cursorStyle} onClick={props.onClick}>
		<Icon type={props.iconType} className="mr-3" />
		<span>{props.content}</span>
	</Row>
);

class Navbar extends Component {
	state = { visible: false };

	showDrawer = () => this.setState({ visible: true });

	onClose = () => this.setState({ visible: false });

	handleLogout = () => {
		const { history: { replace }, logOut, user: { primaryEmail } } = this.props;
		logOut(primaryEmail);
		// setTimeout(() => logOut(primaryEmail), 1000);
		replace('/');
	}

	render() {
		const { user, renderBackBtn = false, navText } = this.props;

		const DrawerHeader = <Meta
			avatar={<Avatar src={fallbackDp} />}
			title={<span className="text-capitalize">{user.firstName}</span>}
			description="Role: Student"/>;

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
										<span className="ml-auto mr-auto"><Link to="/"><span className="text-uppercase" style={{ color: '#fff', fontWeight: 700 }}>{tuitionName}</span></Link></span>
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
						<Link to={`/edit-profile/${user._id}`}><span style={{ color: '#000' }}><NavListItem iconType="edit" content="Edit Profile" /></span></Link>
						<NavListItem iconType="logout" content="Logout" onClick={this.handleLogout} />
					</List>
				</Drawer>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.userInfo
	};
}

export default compose(connect(mapStateToProps, { logOut }), withRouter)(Navbar);


