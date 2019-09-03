import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, } from '@material-ui/core'
import { MaterialTable } from '../../../../../lib/components/material/tables/material.table';
import { ActionCreators } from './../redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from './../../../../../redux/modals/actions';
import DownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ProjectService } from '../../../../../services/project';

class ProjectTable extends React.Component {
	static columns = [

		{ attribute: 'name', key: 'name', numeric: false, disablePadding: true, label: 'Name' },
		{ attribute: 'description', key: 'description', numeric: false, disablePadding: false, label: 'Description' },
		{ attribute: 'is_public', key: 'is_public', numeric: false, disablePadding: false, label: 'Public' },
		{ attribute: 'activity', key: 'activity', numeric: true, disablePadding: false, label: 'Course Module Id' },
		{ attribute: 'metadata.tests', key: 'tests', numeric: true, disablePadding: false, label: 'Tests' },
		{ attribute: 'metadata.cases', key: 'cases', numeric: true, disablePadding: false, label: 'Cases' },
		{ attribute: 'metadata.submissions', key: 'submissions', numeric: true, disablePadding: false, label: 'Submisions' },
	]
	static fileLoaderId = 'newProjectFileLoader' + Date.now()
	static mapStateToProps = (state) => {
		const { projects } = state
		const { list } = projects
		return { ...list }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}

		return { DISPATCHERS }
	}

	componentDidMount() {
		this.props.DISPATCHERS.LOAD_PROJECTS()
	}

	onProjectExportedFileSelected = (event) => {
		const { target = {} } = event
		const { files = [] } = target
		const [file] = files

		if (!file) return

		const reader = new FileReader()
		reader.onloadend = () => {
			const { result: content } = reader
			try {
				const projectJson = JSON.parse(content)
				this.props.onCreateNewProjectFromJson(projectJson)
			} catch (e) {
				this.props.DISPATCHERS.SET_ERROR({ type: 'web', error: { message: 'Just json files are allowed.' } })
			}
		}
		reader.readAsText(file)
	}

	onCreateNewProjectFromFile = () => {
		console.log('loading')

		document.getElementById(ProjectTable.fileLoaderId).click()
	}

	onCreateNewProject = () => {
		this.props.onCreateNewProject()
	}
	onEdit = () => {
		const { _id } = this.selected_project
		this.props.onCreateNewProject(_id)
	}

	onDelete = () => {
		const { _id } = this.selected_project
		this.props.DISPATCHERS.DELETE_PROJECT(_id, {
			after: () => {
				this.selected_project = []
				this.props.DISPATCHERS.LOAD_PROJECTS()
			},
			onError: this.props.DISPATCHERS.SET_ERROR
		})

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

	exportAsMoodle = () => {
		const { _id } = this.selected_project
		ProjectService.exportMoodleActivity(_id)
	}

	exportAsJson = () => {
		const { _id } = this.selected_project
		ProjectService.exportJson(_id)
	}

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
			{ key: 0, label: 'Edit', icon: <EditIcon />, onClick: this.onEdit },
			{ key: 1, label: 'Delete', icon: <DeleteIcon />, onClick: this.onDelete },
			{ key: 2, label: 'Export', icon: <DownloadIcon />, onClick: this.exportAsJson },
			{ key: 3, label: 'Download Moodle', icon: <Icon className={'fas fa-laptop-code'} />, onClick: this.exportAsMoodle },
		]

		const buttonsWhenNotSelected = [
			{ key: 0, label: 'Filter Data', icon: <FilterListIcon />, onClick: this.handleChangeFilter },
			{ key: 1, label: 'Create new Project', icon: <AddIcon />, onClick: this.onCreateNewProject },
			{ key: 2, label: 'Create from file', icon: <Icon className={'fas fa-file-upload'} />, onClick: this.onCreateNewProjectFromFile },
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

		return (
			<React.Fragment>
				<input
					type='file'
					id={ProjectTable.fileLoaderId}
					style={{ display: 'none', width: '0px' }}
					accept='.json'
					onChange={this.onProjectExportedFileSelected} />
				<MaterialTable {...propsTable} title="Projects" />
			</React.Fragment>
		)

	}
}

const ConnectedProjectTable = connect(
	ProjectTable.mapStateToProps,
	ProjectTable.mapDispatchToProps,
)(ProjectTable)

export {
	ConnectedProjectTable as ProjectTable
}