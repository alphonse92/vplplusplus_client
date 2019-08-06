import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, } from '@material-ui/core'
import { MaterialTable } from '../../../../../lib/components/material/tables/material.table';
import { ActionCreators } from './../redux/actions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
})

const columns = [
	{ attribute: '_id', key: '_id', numeric: false, disablePadding: false, label: 'Id' },
	{ attribute: 'name', key: 'name', numeric: false, disablePadding: true, label: 'Name' },
	{ attribute: 'description', key: 'description', numeric: false, disablePadding: false, label: 'Description' },
	{ attribute: 'is_public', key: 'is_public', numeric: false, disablePadding: false, label: 'Public' },
	{ attribute: 'activity', key: 'activity', numeric: true, disablePadding: false, label: 'Activity' },
	{ attribute: 'createdAt', key: 'createdAt', numeric: false, disablePadding: false, label: 'Created at' },
]



class ProjectTable extends React.Component {

	static mapStateToProps = (state) => {
		const { projects } = state
		const { list } = projects
		return list
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = bindActionCreators({ ...ActionCreators }, dispatch)
		return { DISPATCHERS }
	}

	componentDidMount() {
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	onDelete = (idsToDelete) => {
		return console.log(idsToDelete)
	}

	onSelectItem = (item) => {
		console.log(item)
	}

	onRemoveItems = (item) => {
		console.log(item)
	}

	handleRequestSort = (data, value) => {
		this.props.DISPATCHERS.SET_ORDER(value)
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	handleChangePage = (data, value) => {
		console.log('changing page')
		this.props.DISPATCHERS.SET_PAGE(value + 1)
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	handleChangeRowsPerPage = (data, value) => {
		console.log('handle change limit')
		this.props.DISPATCHERS.SET_LIMIT(+value.key)
		this.handleChangePage(data, 0)
	}

	handleChangeFilter = (valueToFind, attributes) => {
		console.log('setting filter')
		// this.props.DISPATCHERS.SET_FILTER(valueToFind, attributes)
	}

	handleSelectItem = async (isSelected, project) => {
		if (isSelected) return []
		return [project._id]
	}
	handleSelectAllItems = async (selectedItems, projects) => {
		if (selectedItems.length) return []
		return projects.map(p => p._id)
	};

	render() {

		const showFilterComponent = false

		const {
			onSelectItem,
			onRemoveItems,
			props,
			handleRequestSort,
			handleChangePage,
			handleChangeRowsPerPage,
			handleChangeFilter,
			handleSelectItem,
			handleSelectAllItems,
		} = this

		const { pagination, onCreateNewProject } = props

		const buttonsWhenSelected = [
			{ key: 0, label: 'Delete', icon: <DeleteIcon />, onClick: this.onDelete },
			{ key: 1, label: 'Make public', icon: <VisibilityIcon />, onClick: this.onSetVisible },
			{ key: 2, label: 'Make private', icon: <VisibilityOffIcon />, onClick: this.onSetPrivate },
		]

		const buttonsWhenNotSelected = [
			{ key: 0, label: 'Filter Data', icon: <FilterListIcon />, onClick: this.handleChangeFilter },
			{ key: 1, label: 'Create new Project', icon: <AddIcon />, onClick: onCreateNewProject },
		]
		const emptyComponent = (
			<div style={{ textAlign: 'center', width: '100%' }}>
				<p>No projects to shown.</p>
				<Button onClick={onCreateNewProject}><AddIcon /> Start a New Project</Button>
			</div>
		)

		const propsTable = {
			keyProp: '_id',
			emptyComponent,
			columns,
			pagination,
			showFilterComponent,
			onSelectItem,
			handleSelectItem,
			handleSelectAllItems,
			handleRequestSort,
			handleChangePage,
			handleChangeRowsPerPage,
			handleChangeFilter,
			onRemoveItems,
			buttonsWhenNotSelected,
			buttonsWhenSelected
		}

		return <MaterialTable {...propsTable} title="Projects" />
	}
}

const ConnectedProjectTable = connect(
	ProjectTable.mapStateToProps,
	ProjectTable.mapDispatchToProps,
)(ProjectTable)
const EnhancedProjectTable = ConnectedProjectTable;
export {
	EnhancedProjectTable as ProjectTable
}