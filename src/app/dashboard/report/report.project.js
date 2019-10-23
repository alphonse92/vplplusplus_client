import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { ActionCreators } from './redux/actions';
import { Report } from './report';


class ReportProject extends React.Component {

	static mapStateToProps = (state) => {
		const { report: root } = state
		const { project = {} } = root
		const { stadistics, report } = project
		const { mostDifficultTest, mostSkilledStudents } = stadistics
		return { report, mostDifficultTest, mostSkilledStudents }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}
		return { DISPATCHERS }
	}

	loadProject() {
		const { id } = this.props
		this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({
			id,
			separeByTopic: true,
			showProjectFilter: true,
			showStudentFilter: false,
			report_type: 'PROJECT'
		})
		this.props.DISPATCHERS.GET_PROJECT_REPORT({ id })
	}

	handleCloseFilterModal = ({ ok, value }) => {
		if (ok) {
			const { id } = this.props
			const { from, to, topic: topics } = value
			const topic = topics.map(t => t.name)
			this.props.DISPATCHERS.SET_FILTER(true, { from, to, topic })
			this.props.DISPATCHERS.GET_PROJECT_REPORT({ id })
		}
	}

	componentDidMount() {
		this.loadProject()
	}

	render() {
		const { props, handleCloseFilterModal } = this
		const { report = [], mostSkilledStudents = [], mostDifficultTest = [] } = props
		const reportProps = { report, mostSkilledStudents, mostDifficultTest, handleCloseFilterModal }
		return <Report {...reportProps} />

	}

}

const ReportProjectConnected = connect(
	ReportProject.mapStateToProps,
	ReportProject.mapDispatchToProps,
)(ReportProject)

export {
	ReportProjectConnected as ReportProject
}

