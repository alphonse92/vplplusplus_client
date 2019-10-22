import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';
import { ProjectReportTimelineCard } from './report.timeline';
import { ReportFilterButton } from './report.filter.button';
import { UserReportTabs } from './report.user.tabs';


export const Report = (props) => {
  const { report, mostSkilledStudents = [], mostDifficultTest = [], handleCloseFilterModal } = props
  return (
    <Flex vertical width="100%">
      <Flex horizontal reverse><ReportFilterButton onClose={handleCloseFilterModal} /></Flex>
      {!!mostSkilledStudents.length && <Flex vertical width="100%"><MostSkilledStudentsByTopicCard data={mostSkilledStudents} /></Flex>}
      {!!mostDifficultTest.length && <Flex vertical width="100%"><MostDifficultTestCard data={mostDifficultTest} /></Flex>}
      {!!report.length && <Flex vertical width="100%"><ProjectReportTimelineCard /></Flex>}
      <UserReportTabs report={report} />
    </Flex>
  )

}

