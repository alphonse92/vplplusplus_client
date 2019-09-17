import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { ReportHeader } from './report.header';
import { NoReportsComponent } from './report.nosubmissions';

export const ReportStudent = (props) => {

	const { report } = props

	return (
		<Flex vertical width="100%">
			<ReportHeader title='Student Report' />
			<NoReportsComponent />
		</Flex>
	)
}
