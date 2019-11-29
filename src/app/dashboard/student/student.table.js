import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReportIcon from '@material-ui/icons/AssignmentOutlined';

import { MaterialTable } from '../../../lib/components/material/tables/material.table';
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';

import { VplLang } from '../../../redux/lang'

class StudentTable extends React.Component {

	static columns = [
		{ attribute: 'username', key: 'username', orderable: true, numeric: false, disablePadding: true, label: <VplLang string="STUDENT_TABLE_COL_USERNAME" /> },
		{ attribute: 'lastname', key: 'lastname', orderable: true, numeric: false, disablePadding: true, label: <VplLang string="STUDENT_TABLE_COL_LASTNAME" /> },
		{ attribute: 'firstname', key: 'firstname', orderable: true, numeric: false, disablePadding: true, label: <VplLang string="STUDENT_TABLE_COL_FIRST_NAME" /> },
		{ attribute: 'email', key: 'is_modificable', orderable: true, numeric: false, disablePadding: false, label: <VplLang string="STUDENT_TABLE_COL_EMAIL" /> },
		{ attribute: 'id', key: 'id', numeric: true, orderable: true, disablePadding: true, label: <VplLang string="STUDENT_TABLE_COL_MOODLE_ID" /> },
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

	handleSelectItem = async (isSelected, student) => {
		if (isSelected) {
			delete this.selected_student
			return []
		}
		this.selected_student = student
		return [student._id]

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

		const studentButtons = [
			{ key: 'student-selected-show-report', label: <VplLang string="STUDENT_TABLE_ACTIONS_SEE_REPORT" />, icon: <ReportIcon />, onClick: () => this.props.showUserReport(this.selected_student) },
		]

		const getButtons = (student_ids_selected = []) => {
			const [studentId] = student_ids_selected
			const { docs: students = [] } = pagination
			const studentSelected = students.find(({ _id }) => studentId === _id)
			if (studentSelected) return studentButtons
			return []
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

		return <MaterialTable {...propsTable} title={<VplLang string="STUDENT_TABLE_TITLE" />} />

	}
}

const ConnectedStudentTable = connect(
	StudentTable.mapStateToProps,
	StudentTable.mapDispatchToProps,
)(StudentTable)

export {
	ConnectedStudentTable as StudentTable
}