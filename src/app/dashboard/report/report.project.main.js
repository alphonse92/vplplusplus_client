import React from 'react'
import { ReportBroker } from './report.broker'

export const Main = (props) => {
	const pathname = '/dashboard/report/student/'
	const showUserReport = ({ _id: id }) => props.history.push(`${pathname}${id ? id : ''}`)
	return <ReportBroker isProjectReport {...props} showUserReport={showUserReport} />
}