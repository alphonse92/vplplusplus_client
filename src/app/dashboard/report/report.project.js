import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { MostSkilledStudentsByTopicCard } from './report.project.skilledstudentbytopic';

export const ReportProject = (props) => {
	const { report = [] } = props
	return (
		<Flex vertical width="100%">
			<Flex horizontal width="100%">
				<MostSkilledStudentsByTopicCard report={report} />
			</Flex>
			{report.map(r => <UserReportTab key={r._id} report={r} />)}
		</Flex>
	)
}
