import React from 'react';
import { isEqual } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';

import { Typography } from '@material-ui/core';
import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { NoReportsComponent } from './report.nosubmissions'
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';
import { ProjectReportTimelineCard } from './report.project.timeline';
import { ReportFilterButton } from './report.filter.button';


class UserReportTabs extends React.Component {

	static mapStateToProps = (state) => {
		const { report: root } = state
		const { project = {} } = root
		const { report = [], filter } = project
		return { report, filter }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}
		return { DISPATCHERS }
	}

	loadProject() {
		const { project_id } = this.props
		return this.props.DISPATCHERS.GET_PROJECT_REPORT({ id: project_id })
	}

	componentDidMount() {
		this.loadProject()
	}

	render() {
		const { report } = this.props
		return (
			<React.Fragment>
				<Typography variant="h5" gutterBottom>Student Reports</Typography>
				{!report.length && <NoReportsComponent />}
				{report.map(r => <UserReportTab key={r._id} report={r} showUserReport={this.props.showUserReport} />)}
			</React.Fragment>
		)
	}
}

const ConnectedUserReportTabs = connect(
	UserReportTabs.mapStateToProps,
	UserReportTabs.mapDispatchToProps,
)(UserReportTabs)

export const ReportProject = (props) => {
	const { project_id } = props
	return (
		<Flex vertical width="100%">
			<Flex horizontal reverse>
				<ReportFilterButton project_id={project_id} />
			</Flex>
			{/* <Typography variant="h5" gutterBottom>Stadistics</Typography> */}

			{/* <Flex vertical width="100%">
				<MostSkilledStudentsByTopicCard data={mostSkilledStudents} />
			</Flex>

			<Flex vertical width="100%">
				<MostDifficultTestCard data={mostDifficultTest} />
			</Flex>

			<Flex vertical width="100%">
				<ProjectReportTimelineCard project_id={project_id} />
			</Flex> */}


			<ConnectedUserReportTabs project_id={project_id} showUserReport={props.showUserReport} />

		</Flex>
	)
}
