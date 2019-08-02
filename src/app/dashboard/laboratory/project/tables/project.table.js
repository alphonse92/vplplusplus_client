import React from 'react';
import { Toolbar, Button, } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { MaterialTable } from '../../../../../lib/components/material/tables/material.table';
const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class ProjectTable extends React.Component {

	onDelete = (idsToDelete) => {
		return console.log(idsToDelete)
	}

	onSelectItem = (item) => {
		console.log(item)
	}
	onRemoveItems = (item) => {
		console.log(item)
	}

	render() {

		const columns = [
			{ attribute: 'id', key: 'id', numeric: false, disablePadding: false, label: 'Id' },
			{ attribute: 'name', key: 'name', numeric: false, disablePadding: true, label: 'Name' },
			{ attribute: 'description', key: 'calories', numeric: false, disablePadding: false, label: 'Description' },
			{ attribute: 'is_public', key: 'fat', numeric: false, disablePadding: false, label: 'Public' },
			{ attribute: 'activity', key: 'carbs', numeric: true, disablePadding: false, label: 'Activity' },
		]
		const data = [

		]

		const showFilterComponent = false

		const {
			onSelectItem,
			onRemoveItems,
			state,
			props,
		} = this
		const { classes, onCreateNewProject } = props
		const emptyComponent = (
			<div style={{ textAlign: 'center', width: '100%' }}>
				<p>No projects to shown.</p>
				<Button onClick={onCreateNewProject}><AddIcon /> Start a New Project</Button>
			</div>
		)
		const propsTable = {
			emptyComponent,
			columns,
			data,
			showFilterComponent,
			onSelectItem,
			onRemoveItems
		}

		return (
			<React.Fragment>
				<MaterialTable {...propsTable} title="Projects" />
			</React.Fragment>
		)


	}
}
const EnhancedProjectTable = withStyles(styles)(ProjectTable);

export {
	EnhancedProjectTable as ProjectTable
}