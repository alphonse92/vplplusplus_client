import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const TableToolbar = (props) => {

	const { numSelected, classes, onFilterPressed,onDeletePressed } = props;
	const ToolbarClassNames = classNames(classes.root, { [classes.highlight]: numSelected > 0 })

	const TypoItemsSelected = <Typography color="inherit" variant="subtitle1">{numSelected} selected</Typography>
	const TypoNoItemsSelected = <Typography variant="h6" id="tableTitle">{props.title}</Typography>
	const DeleteItemButton = (
		<Tooltip title="Delete">
			<IconButton aria-label="Delete" onClick={onDeletePressed}>
				<DeleteIcon  />
			</IconButton>
		</Tooltip>
	)
	const FilterItemsButton = (
		<Tooltip title="Filter list">
			<IconButton aria-label="Filter list" onClick={onFilterPressed}>
				<FilterListIcon />
			</IconButton>
		</Tooltip>
	)

	const TitleComponent = numSelected > 0
		? TypoItemsSelected
		: TypoNoItemsSelected
	const TitleButton = numSelected > 0
		? DeleteItemButton
		: FilterItemsButton

	return (
		<React.Fragment>
			<Toolbar className={ToolbarClassNames}>
				<div className={classes.title}>{TitleComponent}</div>
				<div className={classes.spacer} />
				<div className={classes.actions}>{TitleButton}</div>
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

TableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = withStyles(toolbarStyles)(TableToolbar);


export {
	EnhancedTableToolbar
}