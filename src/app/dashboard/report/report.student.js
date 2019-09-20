import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { Typography } from '@material-ui/core';


export const ReportStudent = (props) => {
	const { report = [] } = props
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Student Report</Typography>
			{report.map(r => <UserReportTab key={r._id} report={r} />)}
		</Flex>
	)
}
