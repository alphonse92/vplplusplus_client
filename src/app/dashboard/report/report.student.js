import React from 'react';
import { Typography } from '@material-ui/core';

import { Flex } from '../../../lib/components/flex';
import { UserReportTab } from './report.user.tab';


export const ReportStudent = (props) => {
	const { report = [] } = props
	return (
		<Flex vertical width="100%">
			<Typography variant="h5" gutterBottom>Student Reports</Typography>
			<UserReportTab report={report[0]} />
		</Flex>
	)
}
