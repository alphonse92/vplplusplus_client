import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { Button, } from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EyeIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import Icon from '@material-ui/core/Icon';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';

import { ProjectService } from '../../../services/project';
// import { cutStringAndAddDots } from '../../../lib';
import { MaterialTable } from '../../../lib/components/material/tables/material.table';
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';

class StudentTable extends React.Component {

	static columns = [
		{ attribute: 'username', key: 'username', orderable: true, numeric: false, disablePadding: true, label: 'Username' },
		{ attribute: 'lastname', key: 'lastname', orderable: true, numeric: false, disablePadding: true, label: 'Lastname' },
		{ attribute: 'firstname', key: 'firstname', orderable: true, numeric: false, disablePadding: true, label: 'Firstame' },
		{ attribute: 'email', key: 'is_modificable', orderable: true, numeric: false, disablePadding: false, label: 'Email' },
		{ attribute: 'id', key: 'id', numeric: true, orderable: true, disablePadding: true, label: 'Moodle id' },
	]

	static mapStateToProps = (state) => {
		const { students } = state
		const { list } = students
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
		this.props.DISPATCHERS.SET_ORDER('lastname')
		this.props.DISPATCHERS.LOAD_STUDENTS()
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

	onCreateNewProject = () => {
		this.props.onCreateNewProject()
	}
	onEdit = () => {
		const { _id } = this.selected_student
		this.props.onCreateNewProject(_id)
	}

	onDelete = () => {
		const { _id } = this.selected_student
		this.props.DISPATCHERS.DELETE_PROJECT(_id, {
			after: () => {
				this.selected_student = []
				this.props.DISPATCHERS.LOAD_STUDENTS()
			},
			onError: this.props.DISPATCHERS.SET_ERROR
		})

	}

	getCurrentSort = () => this.props.pagination.sort
	getCurrentDirection = () => this.props.pagination.direction
	handleRequestSort = (event, value) => {

		const { row } = value
		const { attribute } = row
		const currentSort = this.getCurrentSort()
		const currentDirection = this.getCurrentDirection()
		const shouldChangeDirection = attribute === currentSort

		if (shouldChangeDirection) this.props.DISPATCHERS.SET_DIRECTION(!currentDirection)
		else this.props.DISPATCHERS.SET_ORDER(row.attribute)
		this.props.DISPATCHERS.LOAD_STUDENTS()
	}

	handleChangePage = (data, value) => {
		this.props.DISPATCHERS.SET_PAGE(value + 1)
		this.props.DISPATCHERS.LOAD_STUDENTS()
	}

	handleChangeRowsPerPage = (data, value) => {
		this.props.DISPATCHERS.SET_LIMIT(+value.key)
		this.handleChangePage(data, 0)
	}


	handleSelectItem = async (isSelected, project) => {
		if (isSelected) {
			delete this.selected_student
			return []
		}
		this.selected_student = project
		return [project._id]

	}

	handleSelectAllItems = async (selectedItems, projects) => {
		if (selectedItems.length) return []
		return projects.map(p => p._id)
	};

	exportAsMoodle = () => {
		const { _id } = this.selected_student
		ProjectService.exportMoodleActivity(_id)
	}

	exportAsJson = () => {
		const { _id } = this.selected_student
		ProjectService.exportJson(_id)
	}

	render() {

		const showFilterComponent = false
		const { columns } = StudentTable
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

		const buttonsWhenSelectedAProjectBlocked = [
			{ key: 'project-blocked-show', label: 'See', icon: <EyeIcon />, onClick: this.onEdit },
			{ key: 'project-blocked-export', label: 'Export', icon: <DownloadIcon />, onClick: this.exportAsJson },
			{ key: 'project-blocked-export-as-moodle', label: 'Download Moodle', icon: <Icon className={'fas fa-laptop-code'} />, onClick: this.exportAsMoodle },
		]

		const buttonsWhenSelectedAProjectIsNotBlocked = [
			{ key: 'project-unblocked-edit', label: 'Edit', icon: <EditIcon />, onClick: this.onEdit },
			{ key: 'project-unblocked-delete', label: 'Delete', icon: <DeleteIcon />, onClick: this.onDelete },
			{ key: 'project-unblocked-export', label: 'Export', icon: <DownloadIcon />, onClick: this.exportAsJson },
			{ key: 'project-unblocked-export-as-moodle', label: 'Download Moodle', icon: <Icon className={'fas fa-laptop-code'} />, onClick: this.exportAsMoodle },
		]

		const buttonsWhenNotSelected = [
			// { key: 'no-selected-project-filter', label: 'Filter Data', icon: <FilterListIcon />, onClick: this.handleChangeFilter },
			// { key: 'no-selected-project-new-project', label: 'Create new Project', icon: <AddIcon />, onClick: this.onCreateNewProject },
			// { key: 'no-selected-project-import-from-json', label: 'Create from file', icon: <UploadIcon />, onClick: this.onCreateNewProjectFromFile },
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
				<p>You dont have students. Contact with the moodle administrator to be enrolled into a course</p>
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

		return <MaterialTable {...propsTable} title="Your Students" />

	}
}

const ConnectedStudentTable = connect(
	StudentTable.mapStateToProps,
	StudentTable.mapDispatchToProps,
)(StudentTable)

export {
	ConnectedStudentTable as StudentTable
}