import React from 'react';
import { Button } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';


import { Flex } from '../../../lib/components/flex';
import { ReportProject } from './report.project';
import { ReportStudent } from './report.student';
import { ProjectReportModal } from '../laboratory/project/project.report.modal';

class ReportBroker extends React.Component {

	state = {
		showReportModal: false
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
		const { isProjectReport } = props


		const ReportComponent = isProjectReport
			? (reportComponentProos) => <ReportProject {...reportComponentProos} project_id={this.props.match.params.id} showUserReport={props.showUserReport} />
			: (reportComponentProos) => <ReportStudent {...reportComponentProos} showProjectReport={props.showProjectReport} openProject={props.openProject} />

		return (
			<Flex vertical width="100%">
				<ProjectReportModal open={this.state.showReportModal} onClose={this.onCloseReportModal} />
				<Flex horizontal reverse>
					<Button onClick={this.showReportModal}><FilterList />Filter </Button>
				</Flex>
				<ReportComponent />
			</Flex>
		)


	}
}

export {
	ReportBroker
}