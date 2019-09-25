import React from 'react';
import { Typography } from '@material-ui/core';
import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';

export const ReportProject = (props) => {
	const { report: ProjectReport = {} } = props
	const { report = [], stadistics = {} } = ProjectReport
	const { mostDifficultTest = [], mostSkilledStudents = [] } = stadistics
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Stadistics</Typography>
			<Flex horizontal width="100%">
				<MostSkilledStudentsByTopicCard data={mostSkilledStudents} />
			</Flex>
			<Flex horizontal width="100%">
				<MostDifficultTestCard data={mostDifficultTest} />
			</Flex>
			<Typography variant="h5" gutterBottom>Student Reports</Typography>
			{report.map(r => <UserReportTab key={r._id} report={r} showUserReport={props.showUserReport} />)}
		</Flex>
	)
}
