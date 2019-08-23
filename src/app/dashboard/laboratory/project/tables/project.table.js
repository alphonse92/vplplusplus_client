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

class ProjectTable extends React.Component {
	static columns = [

		{ attribute: 'name', key: 'name', numeric: false, disablePadding: true, label: 'Name' },
		{ attribute: 'description', key: 'description', numeric: false, disablePadding: false, label: 'Description' },
		{ attribute: 'is_public', key: 'is_public', numeric: false, disablePadding: false, label: 'Public' },
		{ attribute: 'activity', key: 'activity', numeric: true, disablePadding: false, label: 'Activity' },
		{ attribute: 'metadata.tests', key: 'tests', numeric: true, disablePadding: false, label: 'Tests' },
		{ attribute: 'metadata.cases', key: 'cases', numeric: true, disablePadding: false, label: 'Cases' },
		{ attribute: 'metadata.submissions', key: 'submissions', numeric: true, disablePadding: false, label: 'Submisions' },

	]
	static mapStateToProps = (state) => {
		const { projects } = state
		const { list } = projects
		return {...list}
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = bindActionCreators({ ...ActionCreators }, dispatch)
		return { DISPATCHERS }
	}

	componentDidMount() {
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	onDelete = () => {
		const { _id } = this.selected_project
		this.props.DISPATCHERS.DELETE_PROJECT(_id)
	}

	handleRequestSort = (data, value) => {
		this.props.DISPATCHERS.SET_ORDER(value)
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	handleChangePage = (data, value) => {
		this.props.DISPATCHERS.SET_PAGE(value + 1)
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	handleChangeRowsPerPage = (data, value) => {
		this.props.DISPATCHERS.SET_LIMIT(+value.key)
		this.handleChangePage(data, 0)
	}

	handleChangeFilter = (valueToFind, attributes) => {
		console.log('setting filter')
	}

	handleSelectItem = async (isSelected, project) => {
		if (isSelected) {
			delete this.selected_project
			return []
		}
		this.selected_project = project
		return [project._id]
	}
	handleSelectAllItems = async (selectedItems, projects) => {
		if (selectedItems.length) return []
		return projects.map(p => p._id)
	};

	render() {

		const showFilterComponent = false
		const { columns } = ProjectTable
		const {
			onSelectItem,
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

		pagination.docs = pagination.docs.reduce((array, doc) => {
			const { tests } = doc
			const metadata = { tests: 0, cases: 0, submissions: 0 }
			const description = doc.description.substring(0, 45) + '...'
			tests.forEach(test => {
				metadata.tests++
				test.test_cases.forEach(test_case => {
					metadata.cases++
					test_case.summaries.forEach(summary => metadata.submissions++)
				})
			})
			array.push({ ...doc, description, metadata })
			return array
		}, [])

		const emptyComponent = (
			<div style={{ textAlign: 'center', width: '100%' }}>
				<p>No projects to shown.</p>
				<Button variant="contained" color="primary" onClick={onCreateNewProject}><AddIcon /> Start a New Project</Button>
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

export {
	ConnectedProjectTable as ProjectTable
}