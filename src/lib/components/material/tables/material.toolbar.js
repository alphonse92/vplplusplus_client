import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
	Close as CloseIcon
} from '@material-ui/icons';
const TableToolbar = (props) => {

	const {
		numSelected,
		classes,
		buttonsWhenSelected = [],
		buttonsWhenNotSelected = [],
		onClose = () => true
	} = props;
	const ToolbarClassNames = classNames(classes.root, { [classes.highlight]: numSelected > 0 })

	const TypoItemsSelected = <Typography color="inherit" variant="subtitle1">{numSelected} selected</Typography>
	const TypoNoItemsSelected = <Typography variant="h6" id="tableTitle">{props.title}</Typography>

	const showButtonSelected = numSelected > 0

	const buttons = showButtonSelected
		? buttonsWhenSelected.concat({ key: Date.now(), label: 'Close', icon: <CloseIcon />, onClick: onClose})
		: buttonsWhenNotSelected

	const buttonsComponent = buttons.map(btn => (
		<div key={btn.key} className={classes.actions}>
			<Tooltip title={btn.label}>
				<IconButton aria-label={btn.label} onClick={btn.onClick ? btn.onClick : () => true}>
					{btn.icon}
				</IconButton>
			</Tooltip>
		</div >
	))

	const TitleComponent = numSelected > 0
		? TypoItemsSelected
		: TypoNoItemsSelected

	return (
		<React.Fragment>
			<Toolbar className={ToolbarClassNames}>
				<div className={classes.title}>{TitleComponent}</div>
				<div className={classes.spacer} />
				{buttonsComponent}

			</Toolbar>
		</React.Fragment>
	)
}

const toolbarStyles = theme => ({
	root: {
		paddingRight: theme.spacing.unit,
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
});

// TableToolbar.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	numSelected: PropTypes.number.isRequired,
// };

const EnhancedTableToolbar = withStyles(toolbarStyles)(TableToolbar);


export {
	EnhancedTableToolbar
}