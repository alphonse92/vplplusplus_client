import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { ReportHeader } from './report.header';
import { NoReportsComponent } from './report.nosubmissions';
import { UserReport } from './report.user';

export const ReportProject = (props) => {

	const { report = [] } = props

	console.log({ props, report })
	return (
		<Flex vertical width="100%">
			<ReportHeader title='Project Report' />
			{!report.length && <NoReportsComponent />}
			{report.map(r => <UserReport report={r} />)}
		</Flex>
	)
}
