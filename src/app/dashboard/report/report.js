import React from 'react';
import { connect } from 'react-redux'
import { Flex } from '../../../lib/components/flex';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';
import { ProjectReportTimelineCard } from './report.project.timeline';
import { ReportFilterButton } from './report.filter.button';
import { UserReportTabs } from './report.user.tabs';


class Report extends React.Component {
  render() {
    const { props } = this
    const { report, mostSkilledStudents = [], mostDifficultTest = [] } = props
    return (
      <Flex vertical width="100%">
        <Flex horizontal reverse><ReportFilterButton onClose={this.handleCloseFilterModal} /></Flex>
        {!!mostSkilledStudents.length && <Flex vertical width="100%"><MostSkilledStudentsByTopicCard data={mostSkilledStudents} /></Flex>}
        {!!mostDifficultTest.length && <Flex vertical width="100%"><MostDifficultTestCard data={mostDifficultTest} /></Flex>}
        {!!report.length && <Flex vertical width="100%"><ProjectReportTimelineCard /></Flex>}
        <UserReportTabs report={report} />
      </Flex>
    )
  }
}

const ReportConnected = connect(
  Report.mapStateToProps,
  Report.mapDispatchToProps,
)(Report)

export {
  ReportConnected as Report
}

