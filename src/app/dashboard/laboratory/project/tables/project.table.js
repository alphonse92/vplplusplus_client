import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toolbar, Button, } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { MaterialTable } from '../../../../../lib/components/material/tables/material.table';
import { ActionCreators } from './../redux/actions';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

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
		console.log('didmount')
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
		console.log('setting ORDER', data, value)
		// this.props.DISPATCHERS.SET_ORDER(value)
	}
	handleChangePage = (data, value) => {
		console.log('setting page', data, value)
		this.props.DISPATCHERS.SET_PAGE(value + 1)
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}
	handleChangeRowsPerPage = (data, value) => {
		console.log('setting lmit', value.key)
		this.props.DISPATCHERS.SET_LIMIT(+value.key)
	}
	handleChangeFilter = (valueToFind, attributes) => {
		console.log('setting filter')
		// this.props.DISPATCHERS.SET_FILTER(valueToFind, attributes)
	}

	render() {
		const columns = [
			{ attribute: '_id', key: '_id', numeric: false, disablePadding: false, label: 'Id' },
			{ attribute: 'name', key: 'name', numeric: false, disablePadding: true, label: 'Name' },
			{ attribute: 'description', key: 'description', numeric: false, disablePadding: false, label: 'Description' },
			{ attribute: 'is_public', key: 'is_public', numeric: false, disablePadding: false, label: 'Public' },
			{ attribute: 'activity', key: 'activity', numeric: true, disablePadding: false, label: 'Activity' },
		]
		const { pagination } = this.props
		const showFilterComponent = false
		const {
			onSelectItem,
			onRemoveItems,
			props,
			handleRequestSort,
			handleChangePage,
			handleChangeRowsPerPage,
			handleChangeFilter
		} = this
		const { onCreateNewProject } = props
		const emptyComponent = (
			<div style={{ textAlign: 'center', width: '100%' }}>
				<p>No projects to shown.</p>
				<Button onClick={onCreateNewProject}><AddIcon /> Start a New Project</Button>
			</div>
		)
		const propsTable = {
			emptyComponent,
			columns,
			pagination,
			showFilterComponent,
			onSelectItem,
			handleRequestSort,
			handleChangePage,
			handleChangeRowsPerPage,
			handleChangeFilter,
			onRemoveItems
		}

		return <MaterialTable {...propsTable} title="Projects" />
	}
}

const ConnectedProjectTable = connect(
	ProjectTable.mapStateToProps,
	ProjectTable.mapDispatchToProps,
)(ProjectTable)
const EnhancedProjectTable =ConnectedProjectTable;
export {
	EnhancedProjectTable as ProjectTable
}