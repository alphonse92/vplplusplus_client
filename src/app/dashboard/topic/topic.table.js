import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { MaterialTable } from '../../../lib/components/material/tables/material.table';
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';


class TopicTable extends React.Component {

	static columns = [
		{ attribute: '_id', key: '_id', orderable: true, numeric: false, disablePadding: true, label: 'Id' },
		{ attribute: 'name', key: 'username', orderable: true, numeric: false, disablePadding: true, label: 'Name' },
		{ attribute: 'description', key: 'lastname', orderable: true, numeric: false, disablePadding: true, label: 'Description' },
		{ attribute: 'hasSummaries', key: 'blocked', orderable: false, numeric: false, disablePadding: true, label: 'Has submissions' },
	]

	static mapStateToProps = (state) => {
		const { topic } = state
		const { list } = topic
		return { ...list }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}
		return { DISPATCHERS }
	}

	state = {}

	componentDidMount() {
		this.props.DISPATCHERS.SET_ORDER('name')
		this.props.DISPATCHERS.GET_TOPICS()
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
		this.props.DISPATCHERS.GET_TOPICS()

	}

	handleChangePage = (data, value) => {
		this.props.DISPATCHERS.SET_PAGE(value + 1)
		this.props.DISPATCHERS.GET_TOPICS()
	}

	handleChangeRowsPerPage = (data, value) => {
		this.props.DISPATCHERS.SET_LIMIT(+value.key)
		this.handleChangePage(data, 0)
	}

	handleSelectItem = async (isSelected, student) => {
		if (isSelected) {
			delete this.selected_topic
			return []
		}
		this.selected_topic = student
		return [student._id]

	}

	deleteTopic = () => {
		const after = () => {
			this.selected_topic = undefined
			this.props.DISPATCHERS.GET_TOPICS()
		}
		const onError = this.props.DISPATCHERS.SET_ERROR
		const opts = { after, onError }
		this.props.DISPATCHERS.DELETE_TOPIC(this.selected_topic._id, opts)
	}

	onDeleteTopic = () => {
		this.deleteTopic(this.selected_topic)
	}

	render() {

		const showFilterComponent = false
		const { columns } = TopicTable
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
			{ key: 'delete-topic', label: 'Delete Topic', icon: <DeleteIcon />, onClick: this.onDeleteTopic },
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
				<p>No topics registered</p>
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
				<MaterialTable {...propsTable} title="Topics registered" />
			</React.Fragment>
		)

	}
}

const ConnectedTopicTable = connect(
	TopicTable.mapStateToProps,
	TopicTable.mapDispatchToProps,
)(TopicTable)

export {
	ConnectedTopicTable as TopicTable
}