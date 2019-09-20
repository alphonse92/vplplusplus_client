import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';
import { UserReportTableCard } from './report.user.table.card';


export const ReportStudent = (props) => {
	const { report = [] } = props
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Student Reports</Typography>
			<Card><UserReportTableCard report={report[0]} /></Card>
		</Flex>
	)
}
