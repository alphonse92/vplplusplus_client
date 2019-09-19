import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';
import { Typography } from '@material-ui/core';
import { MostDifficultTestCard } from './report.project.mostdifficulttestcase';

export const ReportProject = (props) => {
	const { report = [] } = props
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Stadistics</Typography>
			<Flex horizontal width="100%">
				<MostSkilledStudentsByTopicCard report={report} />
			</Flex>
			<Flex horizontal width="100%">
				<MostDifficultTestCard report={report} />
			</Flex>
			<Typography variant="h5" gutterBottom>Student Reports</Typography>
			{report.map(r => <UserReportTab key={r._id} report={r} />)}
		</Flex>
	)
}
