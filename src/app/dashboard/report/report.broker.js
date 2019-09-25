import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { Flex } from '../../../lib/components/flex';
import { ReportProject } from './report.project';
import { ReportStudent } from './report.student';
import { ProjectReportModal } from '../laboratory/project/project.report.modal';
import { NoReportsComponent } from './report.nosubmissions';

class ReportBroker extends React.Component {

	state = {
		showReportModal: false
	}

	static mapStateToProps = (state) => {
		const { report } = state
		const { project = {}, student = {} } = report
		return { report: { project, student } }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}
		return { DISPATCHERS }
	}

	loadReports = (data = {}) => {
		const { match, isProjectReport } = this.props
		const { params } = match
		const { id } = params

		if (!isProjectReport) return this.props.DISPATCHERS.GET_STUDENT_REPORT({ user_id: id, ...data })
		else if (id) return this.props.DISPATCHERS.GET_PROJECT_REPORT({ project_id: id, ...data })
		else return this.props.DISPATCHERS.GET_PROJECTS_REPORT()
	}

	componentDidMount() {
		this.loadReports()
	}

	showReportModal = () => {
		this.setState({ showReportModal: true })
	}

	onCloseReportModal = ({ ok, value }) => {

		if (ok) {
			const { id: project_id } = this.props.match.params
			const { from: date_from, to: date_to, topics: arrayOfTopics } = value
			const topics = arrayOfTopics.map(t => t.name)
			const data = { project_id, date_from, date_to, topics }
			this.loadReports(data)

		}
		this.setState({ showReportModal: false })
	}


	render() {
		const { props } = this
		const { report, isProjectReport } = props
		const reportData = isProjectReport
			? report.project
			: report.student

		const ReportComponent = reportData.report.length
			? (reportComponentProos) => isProjectReport
				? <ReportProject {...reportComponentProos} showUserReport={props.showUserReport} />
				: <ReportStudent {...reportComponentProos} showProjectReport={props.showProjectReport} openProject={props.openProject} />
			: () => <NoReportsComponent />

		return (
			<Flex vertical width="100%">
				<ProjectReportModal open={this.state.showReportModal} onClose={this.onCloseReportModal} />
				<Flex horizontal reverse>
					<Button onClick={this.showReportModal}><FilterList />Filter </Button>
				</Flex>
				<ReportComponent report={reportData} />
			</Flex>
		)


	}
}

const ConnectedReport = connect(
	ReportBroker.mapStateToProps,
	ReportBroker.mapDispatchToProps,
)(ReportBroker)

export {
	ConnectedReport as ReportBroker
}