import React from 'react';
import { connect } from 'react-redux'
import { Flex } from '../../../lib/components/flex';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';
import { ProjectReportTimelineCard } from './report.∫timeline';
import { ReportFilterButton } from './report.filter.button';
import { UserReportTabs } from './report.user.tabs';


class ReportStudent extends React.Component {

	static mapStateToProps = (state) => {
		const { report: root } = state
		const { project = {} } = root
		const { stadistics, report } = project
		const { mostDifficultTest = [], mostSkilledStudents = [] } = stadistics
		return { report, mostDifficultTest, mostSkilledStudents }
	}

	static mapDispatchToProps = () => ({})

	render() {
		const { props } = this
		const { project_id, report, showUserReport, mostSkilledStudents = [], mostDifficultTest = [] } = props
		return (
			<Flex vertical width="100%">
				<Flex horizontal reverse><ReportFilterButton project_id={project_id} /></Flex>
				{!!mostSkilledStudents.length && <Flex vertical width="100%"><MostSkilledStudentsByTopicCard project_id={project_id} data={mostSkilledStudents} /></Flex>}
				{!!mostDifficultTest.length && <Flex vertical width="100%"><MostDifficultTestCard project_id={project_id} data={mostDifficultTest} /></Flex>}
				{!!report.length && <Flex vertical width="100%"><ProjectReportTimelineCard project_id={project_id} /></Flex>}
				<UserReportTabs project_id={project_id} showUserReport={showUserReport} />

			</Flex>
		)
	}
}

const ReportStudentConnected = connect(
	ReportStudent.mapStateToProps,
	ReportStudent.mapDispatchToProps,
)(ReportStudent)

export {
	ReportStudentConnected as ReportStudent
}

