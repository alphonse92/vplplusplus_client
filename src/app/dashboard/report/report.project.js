import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { ReportHeader } from './report.header';
import { NoReportsComponent } from './report.nosubmissions';
import { UserReportTab } from './report.user.tab';

export const ReportProject = (props) => {
	const { report = [] } = props
	return (
		<Flex vertical width="100%">
			{!report.length && <NoReportsComponent />}
			{report.map(r => <UserReportTab key={r._id} report={r} />)}
		</Flex>
	)
}
