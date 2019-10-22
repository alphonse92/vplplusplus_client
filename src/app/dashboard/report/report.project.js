import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Flex } from '../../../lib/components/flex';
import { ActionCreators } from './redux/actions';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';
import { ProjectReportTimelineCard } from './report.project.timeline';
import { ReportFilterButton } from './report.filter.button';
import { UserReportTabs } from './report.user.tabs';


class ReportProject extends React.Component {

	static mapStateToProps = (state) => {
		const { report: root } = state
		const { project = {} } = root
		const { stadistics, report } = project
		const { mostDifficultTest = [], mostSkilledStudents = [] } = stadistics
		return { report, mostDifficultTest, mostSkilledStudents }
	}

	static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

	handleCloseFilterModal = ({ ok, value }) => {
		if (ok) {
			const { project_id, student_id } = this.props
			const { from, to, topic: topics } = value
			const topic = topics.map(t => t.name)
			const data = { from, to, topic }
			const id = project_id || student_id
			const fnName = project_id ? 'GET_PROJECT_REPORT' : 'GET_STUDENT_REPORT'
			this.props.DISPATCHERS.SET_FILTER(!!project_id, data)
			this.props.DISPATCHERS[fnName]({ id })
		}
	}
	render() {
		const { props } = this
		const { project_id, report, showUserReport, mostSkilledStudents = [], mostDifficultTest = [] } = props
		return (
			<Flex vertical width="100%">
				<Flex horizontal reverse><ReportFilterButton onClose={this.handleCloseFilterModal} /></Flex>
				{!!mostSkilledStudents.length && <Flex vertical width="100%"><MostSkilledStudentsByTopicCard project_id={project_id} data={mostSkilledStudents} /></Flex>}
				{!!mostDifficultTest.length && <Flex vertical width="100%"><MostDifficultTestCard project_id={project_id} data={mostDifficultTest} /></Flex>}
				{!!report.length && <Flex vertical width="100%"><ProjectReportTimelineCard project_id={project_id} /></Flex>}
				<UserReportTabs project_id={project_id} showUserReport={showUserReport} />

			</Flex>
		)
	}
}

const ReportProjectConnected = connect(
	ReportProject.mapStateToProps,
	ReportProject.mapDispatchToProps,
)(ReportProject)

export {
	ReportProjectConnected as ReportProject
}

