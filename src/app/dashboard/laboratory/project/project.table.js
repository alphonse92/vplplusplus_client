import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, } from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import EyeIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import Icon from '@material-ui/core/Icon';
import ReportIcon from '@material-ui/icons/AssignmentOutlined';

import { ActionCreators as ActionCreatorsForErrors } from '../../../../redux/modals/actions';
import { MaterialTable } from '../../../../lib/components/material/tables/material.table';
import { ProjectService } from '../../../../services/project';

import { cutStringAndAddDots } from '../../../../lib';
import { ActionCreators } from './redux/actions';
import { ActionCreators as ReportRedux } from './../../report/redux/actions';
import { Dialog, ConfirmationDialog } from '../../../../lib/components/material/modals/input';
import { VplLang } from '../../../../redux/lang'
class ProjectTable extends React.Component {

	static columns = [
		{ attribute: 'name', key: 'name', orderable: true, numeric: false, disablePadding: true, label: <VplLang string="PROJECTS_TABLE_COL_NAME" /> },
		{ attribute: 'description', key: 'description', orderable: true, numeric: false, disablePadding: false, label: <VplLang string="PROJECTS_TABLE_COL_DESCRIPTION" /> },
		{ attribute: 'is_modificable', key: 'is_modificable', numeric: false, disablePadding: false, label: <VplLang string="PROJECTS_TABLE_COL_MODIFICABLE" /> },
		{ attribute: 'activity', key: 'activity', orderable: true, numeric: true, disablePadding: false, label: <VplLang string="PROJECTS_TABLE_COL_COURSE_MODULE_ID" /> },
		{ attribute: 'metadata.tests', key: 'tests', numeric: true, disablePadding: false, label: <VplLang string="PROJECTS_TABLE_COL_TESTS" /> },
		{ attribute: 'metadata.cases', key: 'cases', numeric: true, disablePadding: false, label: <VplLang string="PROJECTS_TABLE_COL_CASES" /> },
		{ attribute: 'metadata.submissions', key: 'submissions', numeric: true, disablePadding: false, label: <VplLang string="PROJECTS_TABLE_COL_SUBMISSIONS" /> },
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
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch),
			...bindActionCreators({ ...ReportRedux }, dispatch)
		}

		return { DISPATCHERS }
	}

	state = { modals: { delete: false } }

	componentDidMount() {
		this.props.DISPATCHERS.SET_ORDER('name')
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
		document.getElementById(ProjectTable.fileLoaderId).click()
	}

	onCreateNewProject = () => {
		this.props.onCreateNewProject()
	}
	onEdit = () => {
		const { _id } = this.selected_project
		this.props.onCreateNewProject(_id)
	}

	deleteProject() {
		const { _id } = this.selected_project
		this.props.DISPATCHERS.DELETE_PROJECT(_id, {
			after: () => {
				this.selected_project = []
				this.props.DISPATCHERS.LOAD_PROJECTS()
			},
			onError: this.props.DISPATCHERS.SET_ERROR
		})
	}

	handleDeleteClose = ({ ok }) => {
		if (ok) this.deleteProject()
		this.toggleDialog('delete')
	}

	toggleDialog(name) {
		const newState = { ...this.state };
		newState.modals[name] = !newState.modals[name]
		this.setState(newState)
	}

	onDelete = () => {
		const project = this.selected_project
		const isBlocked = ProjectService.isBlocked(project)
		if (isBlocked) {
			return this.toggleDialog('delete')
		}
		this.deleteProject()
	}

	getCurrentSort = () => this.props.pagination.sort
	getCurrentDirection = () => this.props.pagination.direction
	handleRequestSort = (data, value) => {
		const { row } = value
		const { attribute } = row
		const currentSort = this.getCurrentSort()
		const currentDirection = this.getCurrentDirection()
		const shouldChangeDirection = attribute === currentSort

		if (shouldChangeDirection) this.props.DISPATCHERS.SET_DIRECTION(!currentDirection)
		else this.props.DISPATCHERS.SET_ORDER(row.attribute)
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


	redirectToReportProject = () => {
		const { _id: project_id } = this.selected_project
		this.props.onCreateReport(project_id)
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

		const { pagination } = props

		pagination.docs = pagination.docs.reduce((array, doc) => {
			const { tests } = doc
			const metadata = { tests: 0, cases: 0, submissions: doc.summaries.length }
			const description = cutStringAndAddDots(doc.description, 64)
			const is_modificable = ProjectService.isBlocked(doc) ? <VplLang string="NO" /> : <VplLang string="YES" />
			tests.forEach(test => {
				metadata.tests++
				metadata.cases += test.test_cases.length
			})
			array.push({ ...doc, description, metadata, is_modificable })
			return array
		}, [])

		const buttonsWhenSelectedAProjectBlocked = [
			{ key: 'project-blocked-show', label: <VplLang string="PROJECTS_TABLE_ACTIONS_SEE" />, icon: <EyeIcon />, onClick: this.onEdit },
			{ key: 'project-unblocked-delete', label: <VplLang string="PROJECTS_TABLE_ACTIONS_DELETE" />, icon: <DeleteIcon />, onClick: this.onDelete },
			{ key: 'project-blocked-report', label: <VplLang string="PROJECTS_TABLE_ACTIONS_GET_REPORT" />, icon: <ReportIcon />, onClick: this.redirectToReportProject },
			{ key: 'project-blocked-export', label: <VplLang string="PROJECTS_TABLE_ACTIONS_EXPORT" />, icon: <DownloadIcon />, onClick: this.exportAsJson },
			{ key: 'project-blocked-export-as-moodle', label: <VplLang string="PROJECTS_TABLE_ACTIONS_DOWNLOAD_MOODLE" />, icon: <Icon className={'fas fa-laptop-code'} />, onClick: this.exportAsMoodle },
		]

		const buttonsWhenSelectedAProjectIsNotBlocked = [
			{ key: 'project-unblocked-edit', label: <VplLang string="PROJECTS_TABLE_ACTIONS_EDIT" />, icon: <EditIcon />, onClick: this.onEdit },
			{ key: 'project-unblocked-delete', label: <VplLang string="PROJECTS_TABLE_ACTIONS_DELETE" />, icon: <DeleteIcon />, onClick: this.onDelete },
			{ key: 'project-unblocked-export', label: <VplLang string="PROJECTS_TABLE_ACTIONS_EXPORT" />, icon: <DownloadIcon />, onClick: this.exportAsJson },
			{ key: 'project-unblocked-export-as-moodle', label: <VplLang string="PROJECTS_TABLE_ACTIONS_DOWNLOAD_MOODLE" />, icon: <Icon className={'fas fa-laptop-code'} />, onClick: this.exportAsMoodle },
		]

		const buttonsWhenNotSelected = [
			{ key: 'no-selected-project-new-project', label: <VplLang string="PROJECTS_TABLE_ACTIONS_CREATE_NEW_PROJECT" />, icon: <AddIcon />, onClick: this.onCreateNewProject },
			{ key: 'no-selected-project-import-from-json', label: <VplLang string="PROJECTS_TABLE_ACTIONS_CREATE_FROM_FILE" />, icon: <UploadIcon />, onClick: this.onCreateNewProjectFromFile },
		]

		const getButtons = (project_ids_selected = []) => {
			const [projectId] = project_ids_selected
			const { docs: projects = [] } = pagination
			const projectSelected = projects.find(({ _id }) => projectId === _id)
			if (!projectSelected) return buttonsWhenNotSelected
			if (!ProjectService.isBlocked(projectSelected)) return buttonsWhenSelectedAProjectIsNotBlocked
			return buttonsWhenSelectedAProjectBlocked
		}

		const emptyComponent = (
			<div style={{ textAlign: 'center', width: '100%' }}>
				<p>	<VplLang string="PROJECTS_TABLE_EMPTY_START_INFO" /></p>
				<Button color="primary" onClick={this.onCreateNewProject}><AddIcon /> <VplLang string="PROJECTS_TABLE_EMPTY_START_PROJECT" /> </Button>
				<VplLang string="OR" />
				<Button color="primary" onClick={this.onCreateNewProjectFromFile}><UploadIcon /> <VplLang string="PROJECTS_TABLE_EMPTY_START_IMPORT" /> </Button>
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
			getButtons
		}

		return (
			<React.Fragment>
				<input
					type='file'
					id={ProjectTable.fileLoaderId}
					style={{ display: 'none', width: '0px' }}
					accept='.json'
					onChange={this.onProjectExportedFileSelected} />
				<Dialog
					open={this.state.modals.delete}
					title={<VplLang string="ARE_YOU_SURE" />}
					handleClose={this.handleDeleteClose}
					text={
						<div>
							<p><VplLang string="PROJECTS_DELETE_WARNING_TITLE" /></p>

							<ul>
								<li><VplLang string="PROJECTS_DELETE_WARNING_TITLE" /></li>
								<li><VplLang string="PROJECTS_DELETE_WARNING_1" /></li>
								<li><VplLang string="PROJECTS_DELETE_WARNING_2" /></li>
								<li><VplLang string="PROJECTS_DELETE_WARNING_3" /></li>
								<li><VplLang string="PROJECTS_DELETE_WARNING_4" /></li>


							</ul>

						</div>
					}
					component={ConfirmationDialog}
				/>
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