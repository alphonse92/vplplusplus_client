import React from 'react';
import { Typography, Card } from '@material-ui/core';

import { Flex } from '../../../lib/components/flex';
import { UserReportTableCard } from './report.user.table.card';


export const ReportStudent = (props) => {
	const { report = [] } = props
	const [userReport] = report
	const { firstname, lastname } = userReport
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Report of {firstname} {lastname}</Typography>
			<Card><UserReportTableCard report={userReport} /></Card>
		</Flex>
	)
}
