import React from 'react';
import { startCase } from 'lodash'
import { Typography, Card } from '@material-ui/core';

import { Flex } from '../../../lib/components/flex';
import { UserReportTableCard } from './report.user.table.card';


export const ReportStudent = (props) => {
	const { report = [] } = props
	const [userReport] = report
	const { firstname, lastname } = userReport
	const fullname = startCase(`${firstname} ${lastname}`)
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Report of {fullname}</Typography>
			<Card><UserReportTableCard report={userReport} /></Card>
		</Flex>
	)
}
