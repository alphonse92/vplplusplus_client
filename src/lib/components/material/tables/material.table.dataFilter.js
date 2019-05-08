import React from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
	Toolbar
	, FormControl
	, Button
	, TextField
	, Input
	, InputLabel
	, Select
	, MenuItem
	, Checkbox
	, ListItemText
	, Chip
	, FormHelperText
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

class FilterComponent extends React.Component {
	state = {
		value: [],
		findFor: ''
	}

	onFilter = () => this.props.onFilter(this.state.findFor, this.state.value)
	onChange = event => this.setState({ findFor: event.target.value })
	getSelectedValues = () => Object.keys(this.state.selected)
	isSelected = value => !!this.state.selected[value]
	// onSelectChange = value => this.setSelected(value)(!this.isSelected(value))
	onSelectChange = event => {
		const { value } = event.target
		this.setState({ value })
	}


	render() {
		const { state, props, onFilter, onSelectChange, onChange } = this
		const { value: arrayOfSelectedOptions } = state
		const { classes, options = [] } = props
		const ToolbarClassNames = classNames(classes.root)
		const id = Math.random().toString()
		const COMPONENT_NAME = Math.random().toString()
		return (
			<React.Fragment>
				<Toolbar className={ToolbarClassNames}>
					<FormControl fullWidth>
						<TextField
							id={id}
							fullWidth
							label="Find for"
							style={{ margin: 8 }}
							placeholder="Ie. Foo Bar"
							helperText="Find a property with this value"
							margin="normal"
							variant="filled"
							InputLabelProps={{ shrink: true, }}
							onChange={onChange}
						/>
					</FormControl>
				</Toolbar >
				<Toolbar>
					<FormControl fullWidth className={classes.formControl}>
						<InputLabel htmlFor={COMPONENT_NAME}>Filter By</InputLabel>
						<Select
							multiple
							autoWidth
							fullWidth
							value={arrayOfSelectedOptions}
							onChange={onSelectChange}
							input={
								<Input id={COMPONENT_NAME} />
							}
							renderValue={
								(selectedItems) => (
									<div className={classes.chips}>
										{selectedItems.map(value => (
											<Chip key={value} label={value} className={classes.chip} />
										))}
									</div>
								)
							}
							MenuProps={MenuProps}>
							{options.map(name => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={arrayOfSelectedOptions.indexOf(name) >= 0} />
									<ListItemText primary={name} name={name} />
								</MenuItem>
							))}
						</Select>
						<FormHelperText>Select the columns that value could match with the 'Find for' value </FormHelperText>
					</FormControl>
				</Toolbar>
				<Toolbar>
					<Button onClick={onFilter} className={classes.button}>
						Filter
     			</Button>
				</Toolbar>
			</React.Fragment>
		)
	}

}

const FilterComponentsStyles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
	},
});

export const EnhancedTableFilter = withStyles(FilterComponentsStyles)(FilterComponent);