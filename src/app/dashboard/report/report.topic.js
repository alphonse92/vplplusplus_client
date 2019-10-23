import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { ActionCreators } from './redux/actions';
import { Report } from './report';
import { ProjectReportTimelineCard } from './report.timeline';


class ReportTopic extends React.Component {

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

	componentDidMount() {
		this.props.DISPATCHERS.SET_REPORT_TYPE('TOPIC')
		this.props.DISPATCHERS.SET_PROJECT_TIMELINE_FILTER({
			separeByTopic: true,
			showTopicFilter: false,
			showProjectFilter: false,
			showStudentFilter: false,
		})
	}

	render() {
		const title = "Topic report timeline"
		const subtitle = "See the topic progress along the time"
		const timelineProps = { title, subtitle }

		return <ProjectReportTimelineCard {...timelineProps} />
	}

}

const ReportTopicConnected = connect(
	ReportTopic.mapStateToProps,
	ReportTopic.mapDispatchToProps,
)(ReportTopic)

export {
	ReportTopicConnected as ReportTopic
}

