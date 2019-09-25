import React from 'react';
import { Typography } from '@material-ui/core';
import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';
import { ProjectReportTimelineCard } from './report.project.timeline';

export const ReportProject = (props) => {
	const { report: ProjectReport = {} } = props
	const { report = [], stadistics = {} } = ProjectReport
	const { mostDifficultTest = [], mostSkilledStudents = [], timeline } = stadistics
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Stadistics</Typography>
			<Flex vertical width="100%">
				<MostSkilledStudentsByTopicCard data={mostSkilledStudents} />
			</Flex>
			<Flex vertical width="100%">
				<MostDifficultTestCard data={mostDifficultTest} />
			</Flex>
			<Flex vertical width="100%">
				<ProjectReportTimelineCard data={timeline} />
			</Flex>
			<Typography variant="h5" gutterBottom>Student Reports</Typography>
			{report.map(r => <UserReportTab key={r._id} report={r} showUserReport={props.showUserReport} />)}
		</Flex>
	)
}
