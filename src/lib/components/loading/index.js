import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
	root: {
		flexGrow: 1,
	},
};

function LinearIndeterminate(props) {
	const { classes } = props;
	return (
		<div style={{ position: 'fixed', width: '100%', zIndex:'999999999' }} className={classes.root}>
			<LinearProgress color="primary" />
			{props.children}
		</div>
	);
}

LinearIndeterminate.propTypes = {
	classes: PropTypes.object.isRequired,
};

export const AppLoading = withStyles(styles)(LinearIndeterminate);