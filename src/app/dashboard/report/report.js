import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { Flex } from '../../../lib/components/flex';
import { ReportHeader } from './report.header';
import { NoReportsComponent } from './report.nosubmissions';

class Report extends React.Component {

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
	}


	render() {
		const {
			isProjectReport = true,
			reports = []
		} = this.props
		const thereReports = !!reports.length
		const title = isProjectReport ? "Project Report" : "Student Report"
		const Body = () => thereReports
			? <NoReportsComponent />
			: <NoReportsComponent />
		return (
			<Flex vertical width="100%">
				<ReportHeader title={title} />
				<Body />
			</Flex>
		)


	}
}

const ConnectedReport = connect(
	Report.mapStateToProps,
	Report.mapDispatchToProps,
)(Report)

export {
	ConnectedReport as Report
}