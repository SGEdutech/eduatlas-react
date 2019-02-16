import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = () => ({
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0
	}
});

class ScrollableTabsButtonAuto extends React.Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<>
				<AppBar position="fixed" color="default" style={{ top: 40 }}>
					<Tabs
						// className={classes.stickToBottom}
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto">
						<Tab label="Item Oneeeeee" />
						<Tab label="Item Two" />
						<Tab label="Item Three" />
						<Tab label="Item Four" />
						<Tab label="Item Five" />
						<Tab label="Item Six" />
					</Tabs>
				</AppBar>
				{value === 0 && <div style={{ height: 2500 }}>Supp Nigga</div>}
				{value === 1 && <div>Item Two</div>}
				{value === 2 && <div>Item Three</div>}
				{value === 3 && <div>Item Four</div>}
				{value === 4 && <div>Item Five</div>}
				{value === 5 && <div>Item Six</div>}
				{value === 6 && <div>Item Seven</div>}
			</>
		);
	}
}

export default withStyles(styles)(ScrollableTabsButtonAuto);
