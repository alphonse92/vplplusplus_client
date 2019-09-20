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
		const { project = [], student = [] } = report
		return { report: { project, student } }
	}

	static mapDispatchToProps = (dispatch) => {
		const DISPATCHERS = {
			...bindActionCreators({ ...ActionCreators }, dispatch),
			...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
		}
		return { DISPATCHERS }
	}

	componentDidMountProjects = () => {
		const { id: project_id } = this.props.match.params
		if (project_id) return this.props.DISPATCHERS.GET_PROJECT_REPORT({ project_id })
		else return this.props.DISPATCHERS.GET_PROJECTS_REPORT()
	}

	componentDidMount() {
		if (this.props.isProjectReport)
			return this.componentDidMountProjects()
		return this.componentDidMountProjects()

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

			if (project_id)
				this.props.DISPATCHERS.GET_PROJECT_REPORT(data)
			else
				this.props.DISPATCHERS.GET_PROJECTS_REPORT(data)

		}
		this.setState({ showReportModal: false })
	}


	render() {
		const { project: isProjectReport = true } = this.props
		const { report } = this.props
		const reportData = isProjectReport
			? report.project
			: report.student

		const ReportComponent = reportData.length ?
			(props) => isProjectReport
				? <ReportProject {...props} showUserReport={this.props.showUserReport} />
				: <ReportStudent {...props} />
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